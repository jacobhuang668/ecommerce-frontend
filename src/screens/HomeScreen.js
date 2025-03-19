import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import { verifyToken } from "../actions/userActions";
function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    //进入action creator
    dispatch(listProducts(category, "", sortOrder));
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(verifyToken(token));
    }
    return () => {
      //nothing to do
      //你可能认为 sortOrder 始终是旧值，但实际上 useEffect 回调中使用的是最新值。
      //清理函数的打印只是反映了上一次的状态。
    };
  }, [category, sortOrder]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              onChange={(e) => {
                setSearchKeyword(e.target.value);
              }}
            ></input>
            <button>search</button>
          </form>
        </li>
        <li>
          Sort By{" "}
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
            }}
          >
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div>Loading....</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products.map((product) => {
            return (
              <li key={product._id}>
                <div className="product">
                  <img
                    className="product-image"
                    src={`http://localhost:8964${product.image}`}
                    alt="product"
                  ></img>
                  <div className="product-name">{product.name}</div>
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-price">{product.price}</div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
export default HomeScreen;
