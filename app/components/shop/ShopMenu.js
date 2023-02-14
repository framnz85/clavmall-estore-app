import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MenuContent from "./MenuContent";

import { getData } from "../../functions/asyncstorage";
import { getCategories, getSubcats, getParents } from "../../functions/filters";

const initialState = {
  maxCategories: 7,
  maxSubcats: 7,
  maxParents: 7,
  minPrice: 0,
  maxPrice: 0,
  categoryIds: [],
  subcatIds: [],
  parentIds: [],
};

function ShopMenu({ search, setSearch, toggleOpenClose }) {
  let dispatch = useDispatch();

  const { categories, subcats, parents, user } = useSelector(
    (state) => ({
      ...state,
    })
  );

  const {
    price,
    category,
    subcategory,
    parent,
  } = search;
  
  const [menus, setMenus] = useState({
    ...initialState,
    minPrice: price && price[0],
    maxPrice: price && price[1],
    categoryIds: category ? category : [],
    subcatIds: subcategory ? subcategory : [],
    parentIds: parent ? parent : [],
  });
  const [categoryList, setCategoryList] = useState(categories && [...categories]);
  const [subcatList, setSubcatList] = useState(subcats && [...subcats]);
  const [parentList, setParentList] = useState(parents && [...parents]);

  const {
    minPrice,
    maxPrice,
    categoryIds,
    subcatIds,
    parentIds,
  } = menus;

  useEffect(() => {
    loadCategories();
    loadSubcats();
    loadParents();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadCategories = () => {
    getData("categories").then(categories => {
      getData("products").then(products => {
        if(!categories || !products ){console.log(1)
          getCategories(user.address ? user.address : {}).then((category) => {
            setCategoryList(category.data.categories);
            dispatch({
              type: "CATEGORY_LIST_III",
              payload: category.data.categories,
            });
            dispatch({
                type: "PRODUCT_LIST_VII",
                payload: category.data.products,
            });
          });
        }
      });
    });
  };

  const loadSubcats = () => {
    getData("subcats").then(subcats => {
      if (!subcats) {
        getSubcats().then((subcat) => {
          setSubcatList(subcat.data);
          dispatch({
            type: "SUBCAT_LIST_II",
            payload: subcat.data,
          });
        });
      }
    });
  };

  const loadParents = () => {
    getData("parents").then(parents => {
      if (!parents) {
        getParents().then((parent) => {
          setParentList(parent.data);
          dispatch({
            type: "PARENT_LIST_II",
            payload: parent.data,
          });
        });
      }
    });
  };

  const handlePrice = () => {
    setSearch({
      ...search,
      price: [
          minPrice ? parseFloat(minPrice) : 0,
          maxPrice ? parseFloat(maxPrice) : 999999999,
        ],
    });
  };

  const handleCategoryCheck = (catId) => {
    let inTheState = [...categoryIds];
    let justChecked = catId;
    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setMenus({
      ...menus,
      categoryIds: inTheState,
    });
    setSearch({
      ...search,
      category: inTheState ? inTheState : [],
    });
  };

  const handleStarClick = (num) => {
    setSearch({
      ...search,
      stars: num,
    });
  };

  const handleSubcatCheck = (subId) => {
    let inTheState = [...subcatIds];
    let justChecked = subId;
    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setMenus({
      ...menus,
      subcatIds: inTheState,
    });
    setSearch({
      ...search,
      subcategory: inTheState ? inTheState : [],
    });
  };

  const handleParentCheck = (parId) => {
    let inTheState = [...parentIds];
    let justChecked = parId;
    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setMenus({
      ...menus,
      parentIds: inTheState,
    });
    setSearch({
      ...search,
      parent: inTheState ? inTheState : [],
    });
  };

  return (
    <MenuContent
      menus={menus}
      setMenus={setMenus}
      categoryList={categoryList}
      subcatList={subcatList}
      parentList={parentList}
      handlePrice={handlePrice}
      handleCategoryCheck={handleCategoryCheck}
      handleStarClick={handleStarClick}
      handleSubcatCheck={handleSubcatCheck}
      handleParentCheck={handleParentCheck}
      toggleOpenClose={toggleOpenClose}
    />
  );
}

export default ShopMenu;