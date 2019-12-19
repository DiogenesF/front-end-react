import React from 'react';
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import DishDetail from "./DishdetailComponent"
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import {postComment,postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders} from "../redux/ActionCreators";
import {actions} from "react-redux-form";
import {TransitionGroup, CSSTransition} from "react-transition-group";

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset("feedback"))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  postFeedback: (firstname, lastname, number, email, agree, contactType, message) => {dispatch(postFeedback(firstname, lastname, number, email, agree, contactType, message))}
});

class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
        />
      );
    }

    const DishWidthId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          CommentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      );
    }

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" component={DishWidthId} />
              <Route exact path="/aboutus" component={() => <About isLoading={this.props.leaders.isLoading}
               errMess={this.props.leaders.errMess}
               leaders={this.props.leaders.leaders} />} />
              <Route exact path="/contactus" component={() => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm}/> } />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
