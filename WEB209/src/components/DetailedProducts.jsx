/* eslint-disable no-undef */
import { useEffect, useState } from 'react'
import { getDetailedProduct , getProducts } from '../services/Products';
import { Link, useParams } from 'react-router-dom';

const DetailedProducts = () => {
  const [ detailedproduct , setDetailProduct ] = useState([]);

  const [ hotProducts , setHotProducts ] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchedDetailProduct = async () =>{
      try {
        const res = await getDetailedProduct(id);
        setDetailProduct(res.data);
          console.log(res);
      } catch (error) {
        console.error(`Error fetching product: ${error.message}`);
      }
    }
    const fetchedProduct = async () =>{
    try {
      const res = await getProducts();
      setHotProducts(res.data);
    } catch (error) {
      console.error(`Error fetching product: ${error.message}`);
    }
    }
    fetchedProduct();
    fetchedDetailProduct();
  }, [id]);
  
  return (
    <>
  <section className="ab-info-main py-md-5 py-4">
    <div className="container py-md-3">
      <div className="row">
        <div className="left-ads-display col-lg-8">
          { detailedproduct && (
             <> 
            <div className="row">
              <div className=" col-md-6">
                <img
                  src={`http://localhost:3000/images/${detailedproduct.image}`}
                  className="img-fluid"
                  alt="" />
              </div>  
              <div className="desc1-right col-md-6 pl-lg-4">
                <h3>
                  {detailedproduct.model}
                </h3>
                <h5>
                  {detailedproduct.price}
                </h5>
                <div className="available mt-3">
                  <form action="#" method="post" className="w3layouts-newsletter">
                    <button className="btn1">Buy Now</button>
                  </form>
                  <span>
                    <a href="#">login to save in wishlist </a>
                  </span>
                  <p>
                    Lorem Ipsum has been the industry standard since the 1500s.
                    Praesent ullamcorper dui turpis..{" "}
                  </p>
                </div>
                <div className="share-desc">
                  <div className="share">
                    <h4>Share Product :</h4>
                    <ul className="w3layouts_social_list list-unstyled">
                      <li>
                        <a href="#" className="w3pvt_facebook">
                          <span className="fa fa-facebook-f" />
                        </a>
                      </li>
                      <li className="mx-2">
                        <a href="#" className="w3pvt_twitter">
                          <span className="fa fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="w3pvt_dribble">
                          <span className="fa fa-dribbble" />
                        </a>
                      </li>
                      <li className="ml-2">
                        <a href="#" className="w3pvt_google">
                          <span className="fa fa-google-plus" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="clearfix" />
                </div>
              </div>
            </div>
              </>
          )
}
  <h3 className="shop-sing">Hot Products</h3>
    <div className="row m-0">
      {hotProducts.filter( hP => hP.isHot === 1 ).map( hP => (
  <div className="col-md-4 product-men" key={hP._id}>
  <div className="product-shoe-info shoe text-center">
    <div className="men-thumb-item" >
      <img src={`/src/assets/images/${hP.image}`} className="img-fluid" alt="" />
      <span className="product-new-top" style={{marginTop:"10px"}}>New</span>
    </div>
    <div className="item-info-product">
      <h4>
      <Link to={`/product/${hP._id}`} name="productname">{hP.model}</Link>
      </h4>
      <div className="product_price">
        <div className="grid-price">
          <span className="money">${hP.price}</span>
        </div>
      </div>
      <ul className="stars">
        <li>
          <a href="#">
            <span className="fa fa-star" aria-hidden="true" />
          </a>
        </li>
        <li>
          <a href="#">
            <span className="fa fa-star" aria-hidden="true" />
          </a>
        </li>
        <li>
          <a href="#">
            <span
              className="fa fa-star-half-o"
              aria-hidden="true"
            />
          </a>
        </li>
        <li>
          <a href="#">
            <span
              className="fa fa-star-half-o"
              aria-hidden="true"
            />
          </a>
        </li>
        <li>
          <a href="#">
            <span className="fa fa-star-o" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
))}
</div>
</div>
</div>
</div>
</section>
    </>
  )
}

export default DetailedProducts