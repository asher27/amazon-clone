import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img
                    className="home__image"
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                    alt=""
                />
                <div className="home__row">
                    <Product
                        id="1"
                        title="IVEOPPE Backlit Keyboard Case for Samsung Galaxy Tab S6 Lite 10.4 2020 Model SM-P610/P615, 7 Colors Backlight Detachable Wireless"
                        price={29.99}
                        image="https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71APft4jQFS._AC_UL320_.jpg"
                        rating={5}
                    />
                    <Product
                        id="2"
                        title="Nintendo Switch™ with Neon Blue and Neon Red Joy‑Con™"
                        price={298.98}
                        image="https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/61nfFrm5NcL._AC_UL320_.jpg"
                        rating={5}
                    />
                </div>
                <div className="home__row">
                    <Product
                        id="3"
                        title="Amazon Basics 48 Pack AA High-Performance Alkaline Batteries, 10-Year Shelf Life, Easy to Open Value Pack"
                        price={16.49}
                        image="https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/81ZnAYiX5sL._AC_UL320_.jpg"
                        rating={4}
                    />
                    <Product
                        id="4"
                        title="Beats Studio Buds - True Wireless Noise Cancelling Earbuds - Compatible with Apple & Android, Built-in Microphone, IPX4 Rating, Sweat Resistant"
                        price={50.38}
                        image="https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/51bRSWrEc7S._AC_UL320_.jpg"
                        rating={5}
                    />
                    <Product
                        id="5"
                        title="Roku Streaming Stick 4K | Streaming Device 4K/HDR/Dolby Vision with Roku Voice Remote and TV Controls"
                        price={36.75}
                        image="https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71wrIZujPIL._AC_UL320_.jpg"
                        rating={4}
                    />
                </div>
                <div className="home__row">
                    <Product
                        id="6"
                        title="LEGO City Great Vehicles Holiday Camper Van 60283 Building Toy Set for Kids, Boys, and Girls Ages 5+ (190 Pieces)"
                        price={15.97}
                        image="https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/81beHQWXsuL._AC_UL320_.jpg"
                        rating={5}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
