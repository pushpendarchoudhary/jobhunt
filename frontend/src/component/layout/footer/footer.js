import React from "react";
import './footer.css'

const Footer =() => {
    return(
		
        <footer className="footer-distributed">

			<div className="footer-left">

				<h3>JOB<span>HUNT</span></h3>

				<p className="footer-links">
					<a href="#" className="link-1">Home</a>
					
					<a href="#">Blog</a>
				
					<a href="#">Pricing</a>
				
					<a href="#">About</a>
					
					<a href="#">Faq</a>
					
					<a href="#">Contact</a>
				</p>

				<p className="footer-company-name">Company Name © 2015</p>
			</div>

			<div className="footer-center">

				<div>
					<i className="fa fa-map-marker"></i>
					<p><span>c 8/12 C-BLOCK</span> GOVINDPURAM, INDIA</p>
				</div>

				<div>
					<i className="fa fa-phone"></i>
					<p>+917351544474</p>
				</div>

				<div>
					<i className="fa fa-envelope"></i>
					<p><a href="mailto:gamingtolimit@gmail.com">gamingtolimit@gmail.com</a></p>
				</div>

			</div>

			<div className="footer-right">

				<p className="footer-company-about">
					<span>About the company</span>
					Our platform is designed to empower individuals like you with the tools and resources needed to make informed career choices. 
				</p>

				<div className="footer-icons">

					<a href="https://www.instagram.com/p.choudhary428/"><i className="fa fa-facebook"></i></a>
					<a href="https://www.youtube.com/channel/UCecA9d3LXNhFnIDt8Pdo8fw"><i className="fa fa-twitter"></i></a>
					<a href="linkedin.com/in/pushpendar-c-353403132"><i className="fa fa-linkedin"></i></a>
					<a href="https://github.com/pushpendarchoudhary"><i className="fa fa-github"></i></a>

				</div>

			</div>

		</footer>
    )
}

export default Footer;