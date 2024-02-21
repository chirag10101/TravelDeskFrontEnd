import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { contactConfig } from "./content_option";
 
function ContactUs() {
    return (
        <div>
            <Container className="">
            <Row className="mb-4 mt-3">
                <Col lg={8}>
                    <h1 className="display-4 mb-4">
                        Contact Us
                    </h1>
                </Col>
            </Row>
            <Row className="sec_sp">
                <Col lg={5} className="mb-5">
                    <h3 className="color_sec py-4">Get in touch</h3>
                    <address>
                        <strong>Email : Travelguide@gmail.com</strong>
                        <br />
                        <br />
                        <p>
                            <strong>Phone : +65 453 453</strong>
                        </p>
                    </address>
                    <p>{contactConfig.description}</p>
                </Col>
                <Col lg={7} className="d-flex align-items-center">
                    <form className="contact_form w-100">
                        <Row>
                            <Col lg={6} className="form-group">
                                <input
                                    className="form-control rounded-0 border-1 border-black"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    type="text"
                                />
                            </Col>
                            <Col lg={6} className="form-group">
                                <input
                                    className="form-control rounded-0 border-1 border-black"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                />
                            </Col>
                        </Row>
                        <textarea
                            className="form-control rounded-0 border-1 border-black"
                            id="message"
                            name="message"
                            placeholder="Message"
                            rows={5}
                        ></textarea>
                        <br />
                        <Col lg='12' className="form-group">
                            <button className="btn btn-success" type="submit">Send</button>
                        </Col>
                    </form>
                </Col>
            </Row>
        </Container>
        </div>
        
    );
}
 
export default ContactUs;