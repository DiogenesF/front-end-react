import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";



    function RenderDish({dish}) {
        return (
            <div>
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle><strong>{dish.name}</strong></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    function RenderComments({comments}) {
        if (comments != null) {
            const values = comments.map((each) => {
                return (
                    <div key={each.id} className="mt-1">
                        <ul className="list-unstyled">
                            <li>{each.comment}</li>
                            <li>-- {each.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(each.date)))}</li>
                        </ul>
                    </div>
                );
            })
    
            return (
                <div>
                    <h4>Comments</h4>
                    {values}
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    function DishDetail(props) {
        if (props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.dish.comments} />
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }


export default DishDetail;