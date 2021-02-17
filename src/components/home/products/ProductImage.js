import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

//css
import "./css/ProductImage.css"

//Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const useStyles = makeStyles((theme) =>({
    slideContainer: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center'
    },
    slideImage: {
      width: '80%',
      margin: 'auto',
      borderRadius: '10px',
      [theme.breakpoints.down('576')]: {
        width: '90%'
      }
    },
}));


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  //classes = useStyles();

  return (
    <div
      className={className}
      style={{ ...style, display: "block", cursor: 'pointer'}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", cursor: 'pointer'}}
      onClick={onClick}
    />
  );
}


export default function ProductImage({classes, type}) {
    classes = useStyles();
    var settings = {
        infinite: true,
        fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow className={classes.slideArrow} />,
        prevArrow: <SamplePrevArrow />
    };

    return (
            <Slider {...settings}>
                <div className={classes.slideContainer}>
                    <img alt="product" className={classes.slideImage} src={`./img/home/products/${type}/photo1.png`}/>
                </div>
                <div>
                    <img alt="product" className={classes.slideImage} src={`./img/home/products/${type}/photo2.png`}/>
                </div>
                <div>
                    <img alt="product" className={classes.slideImage} src={`./img/home/products/${type}/photo3.png`}/>
                </div>
            </Slider>
    )
}
