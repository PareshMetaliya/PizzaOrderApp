import React from 'react'
import "../style/footer2.css";

function Footer2() {
    return (
      <div className="footer2container">
        <div className="footer2item">
          <img src="/img/bg.png" style={{objectFit:"cover", layout:"fill"}} className='footer2img' alt="" />
        </div>
        <div className="footer2item">
          <div className="footer2card">
            <h2 className="footer2motto">
              THE MOM'S PIZZA, <br/>WELL BAKED SLICE OF PIZZA. <br/>Order, Eat, Repeat
            </h2>
          </div>
          <div className="footer2card">
            <h1 className="footer2title">FIND OUR RESTAURANTS</h1>
            <p className="footer2text">
            New City Light, Althan,<br /> Surat,395007 <br />Gujarat , India
              
            </p>
            <p className="footer2text">
            Opp. Lourdes Convent School, Athwalines,<br /> Surat, 395001<br />Gujarat, India
            </p>
            <p className="footer2text">
            1st floor, sangini square,<br /> near kashi plaza, Majura Gate,<br /> Surat, 395002<br />Gujarat , India
            </p>
           
          </div>
          <div className="footer2card">
            <h1 className="footer2title">WORKING <br/>HOURS</h1>
            <p className="footer2text">
              MONDAY - FRIDAY
              <br /> 9:00 – 22:00
            </p>
            <p className="footer2text">
              SATURDAY - SUNDAY
              <br /> 12:00 – 24:00
            </p>
          </div>
        </div>
      </div>
    );
  }

export default Footer2
