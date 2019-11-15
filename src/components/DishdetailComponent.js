import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends React.Component {

    renderDish(dish) {
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

    renderComments(comments) {
        if (comments != null) {
            const convertMonth = (month) => {
                if (month === '01') return "Jan";
                if (month === '02') return "Feb";
                if (month === '03') return "Mar";
                if (month === '04') return "Apr";
                if (month === '05') return "May";
                if (month === '06') return "Jun";
                if (month === '07') return "Jul";
                if (month === '08') return "Aug";
                if (month === '09') return "Sep";
                if (month === '10') return "Oct";
                if (month === '11') return "Nov";
                if (month === '12') return "Dec";
            }
            const values = comments.map((each) => {
                let year = each.date.slice(0, 4);
                let month = convertMonth(each.date.slice(5, 7));
                let day = parseInt(each.date.slice(8, 10)) + 1;
                if (day < 10) {
                    day.toString();
                    day = "0" + day;
                }
                return (
                    <div key={each.id} className="mt-1">
                        <ul className="list-unstyled">
                            <li>{each.comment}</li>
                            <li>-- {each.author}, {month} {day}, {year}</li>
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

    render() {
        if (this.props.dish != null) {
            return (
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(this.props.dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            {this.renderComments(this.props.dish.comments)}
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

}

export default DishDetail;