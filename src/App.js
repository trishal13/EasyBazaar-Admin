import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Enquiries from './pages/Enquiries';
import BlogList from './pages/BlogList';
import BlogCatList from './pages/BlogCatList';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import ColorList from './pages/ColorList';
import CategoryList from './pages/CategoryList';
import BrandList from './pages/BrandList';
import ProductList from './pages/ProductList';
import AddBlog from './pages/AddBlog';
import AddBlogCat from './pages/AddBlogCat';
import AddColor from './pages/AddColor';
import AddCat from './pages/AddCat';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';
import CouponList from './pages/CouponList';
import AddCoupon from './pages/AddCoupon';
import ViewEnquiry from './pages/ViewEnquiry';
import ViewOrder from './pages/ViewOrder';
import { OpenRoutes } from './routing/OpenRoutes';
import { PrivateRoutes } from './routing/PrivateRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<OpenRoutes><Login /></OpenRoutes>} />
        <Route path='/admin' element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
            <Route index element={<Dashboard />} />
            <Route path='enquiries' element={<Enquiries />} />
            <Route path='enquiries/:id' element={<ViewEnquiry />} />
            <Route path='blog-list' element={<BlogList />} />
            <Route path='blog' element={<AddBlog />} />
            <Route path='blog/:id' element={<AddBlog />} />
            <Route path='coupon-list' element={<CouponList />} />
            <Route path='coupon' element={<AddCoupon />} />
            <Route path='coupon/:id' element={<AddCoupon />} />
            <Route path='blog-category-list' element={<BlogCatList />} />
            <Route path='blog-category' element={<AddBlogCat />} />
            <Route path='blog-category/:id' element={<AddBlogCat />} />
            <Route path='orders' element={<Orders />} />
            <Route path='orders/:id' element={<ViewOrder />} />
            <Route path='customers' element={<Customers />} />
            <Route path='list-color' element={<ColorList />} />
            <Route path='color' element={<AddColor />} />
            <Route path='color/:id' element={<AddColor />} />
            <Route path='list-category' element={<CategoryList />} />
            <Route path='category' element={<AddCat />} />
            <Route path='category/:id' element={<AddCat />} />
            <Route path='list-brand' element={<BrandList />} />
            <Route path='brand' element={<AddBrand />} />
            <Route path='brand/:id' element={<AddBrand />} />
            <Route path='list-product' element={<ProductList />} />
            <Route path='product' element={<AddProduct />} />
        </Route>          
      </Routes>
    </Router>
  );
}

export default App;
