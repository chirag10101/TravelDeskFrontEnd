import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
 
function LandingPage() {
    const navigate = useNavigate();
 
    const handleLogin = () => {
       
        navigate('/login');
    }
    return (
        <div className="landing-page">
            <Carousel controls={false} indicators={false} fade={true} pause={false} interval={2000}>
                <Carousel.Item>
                    <div className="bg-image1 d-flex justify-content-center align-items-center">
                        <div className="px-4 py-5 my-5 text-center text-white">
                            <h1 className="display-3 fw-bold">Travel Guide</h1>
                            <div className="col-lg-6 mx-auto">
                                <p className="lead mb-4">The Web-based platform aims to automate the process of tracking employees' travel status, enhancing efficiency and accuracy. Improving the travel tracking process to provide a seamless experience for employees, enhancing their overall satisfaction.</p>
                                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                    <button type="button" className="btn btn-primary btn-lg px-4 gap-3" onClick={handleLogin}>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="bg-image2 d-flex justify-content-center align-items-center">
                        <div className="px-4 py-5 my-5 text-center text-white">
                            <h1 className="display-3 fw-bold">Travel Guide</h1>
                            <div className="col-lg-6 mx-auto">
                                <p className="lead mb-4">The Web-based platform aims to automate the process of tracking employees' travel status, enhancing efficiency and accuracy. Improving the travel tracking process to provide a seamless experience for employees, enhancing their overall satisfaction.</p>
                                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                    <button type="button" className="btn btn-primary btn-lg px-4 gap-3" onClick={handleLogin}>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="bg-image3 d-flex justify-content-center align-items-center">
                        <div className="px-4 py-5 my-5 text-center text-white">
                            <h1 className="display-3 fw-bold">Travel Guide</h1>
                            <div className="col-lg-6 mx-auto">
                                <p className="lead mb-4">The Web-based platform aims to automate the process of tracking employees' travel status, enhancing efficiency and accuracy. Improving the travel tracking process to provide a seamless experience for employees, enhancing their overall satisfaction.</p>
                                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                    <button type="button" className="btn btn-primary btn-lg px-4 gap-3" onClick={handleLogin}>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="bg-image4 d-flex justify-content-center align-items-center">
                        <div className="px-4 py-5 my-5 text-center text-white">
                            <h1 className="display-3 fw-bold">Travel Guide</h1>
                            <div className="col-lg-6 mx-auto">
                                <p className="lead mb-4">The Web-based platform aims to automate the process of tracking employees' travel status, enhancing efficiency and accuracy. Improving the travel tracking process to provide a seamless experience for employees, enhancing their overall satisfaction.</p>
                                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                    <button type="button" className="btn btn-primary btn-lg px-4 gap-3" onClick={handleLogin}>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
 
 
export default LandingPage;