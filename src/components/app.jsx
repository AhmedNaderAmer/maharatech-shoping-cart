import React, { Component } from 'react';
import NavBar from './navbar';
import {Route, Switch ,Redirect} from 'react-router-dom';
// import ShopingCart from './shopingCart';
// import About from './about';
// import Contact from './contact';
// import Home from './home';
import ShopingCart from './shopingCart';
import ProductDetails from './productDetails';
import NotFound from './notFound';
import Menu from "./menu";

 class App extends Component {
    state = {
        Products: [
            { id: 1, name: "Burger", count: 0, price: 30, isInCart: false },
            { id: 2, name: "Fries", count: 0, price: 20, isInCart: false },
            { id: 3, name: "Cola", count: 0, price: 10, isInCart: false },
          ],
    };
    
    handleDelete = product => {
        const Products = this.state.Products.filter(p => p.id !== product.id);

        this.setState({Products : Products});

    }

    hendleReset = () => {
        //Clone
        let Products = [...this.state.Products];
        //Edit
        Products = Products.map(p => {
            p.count = 0;
            return p;
        })
        //Set state
        this.setState({Products})
    }

    IncrementHandler = product =>  {
        //clone
        const Products = [...this.state.Products];
        const index = Products.indexOf(product);
        Products[index] = {...Products[index]};

        //edit
        Products[index].count++;

        //set state
        this.setState({Products});
    }
    handleInCartChange = (product) => {
        //Clone
        const Products = [...this.state.Products];
        const index = Products.indexOf(product);
        Products[index] = { ...Products[index] };
        //Edit
        Products[index].isInCart = !Products[index].isInCart;
        //Set State
        this.setState({ Products });
      };

     render() { 
         return (
             <React.Fragment>
                 <NavBar productCount={this.state.Products.filter(p => p.count > 0).length} />
                 <main className="container">
                     <Switch>
                         <Route path="/Products/:id/:name?" 
                         render={props => <ProductDetails Products={this.state.Products}
                          {...props} />} />
                         <Route path="/cart" render={props =>
                            <ShopingCart
                            Products={this.state.Products}
                            onIncrement={this.IncrementHandler}
                            onDelete={this.handleDelete}
                            onReset={this.hendleReset}
                            {...props}
                            />} />
                            <Route
                            path="/menu"
                            render={(props) => (
                                <Menu
                                {...props}
                                Products={this.state.Products}
                                onClick={this.handleInCartChange}
                                />
                            )}
                            />
                        {/* <Route path="/about" component={About} /> */}
                        {/* <Route path="/contact" component={Contact} /> */}
                        {/* <Route path="/home"  component={Home} /> */}
                        <Redirect  from='/' to='/home' />
                        <Route path="/notfound" component={NotFound} />
                        <Redirect to='/notfound' />


                     </Switch>
                    
                 </main>
             </React.Fragment>
         );
     }
 }
  
 export default App;