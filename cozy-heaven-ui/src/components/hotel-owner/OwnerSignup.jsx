import React, { useState } from 'react';
import { Container, Form, Row, Col, Button, Modal, Navbar, Nav } from 'react-bootstrap';
import { FaUserPlus } from 'react-icons/fa';

const OwnerSignup = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerEmail: '',
    ownerPassword: '',
    ownerPhone: '',
    ownerIdType: '',
    ownerIdNumber: '',
    businessRegNo: '',
    gstin: '',
    bankDetails: '',
    hotelName: '',
    hotelAddress: '',
    hotelCity: '',
    hotelState: '',
    hotelZip: '',
    hotelCountry: '',
    hotelContactEmail: '',
    hotelContactPhone: '',
    hotelLicense: '',
    propertyProofType: '',
    propertyProof: '',
    starRating: '',
    safetyCerts: '',
    hotelPhotos: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="bg-light" style={{ paddingTop: '80px' }}>
      {/* Navigation Bar */}
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top" className="py-3 shadow" style={{ background: 'linear-gradient(135deg, #003366, #0066cc)' }}>
        <Container>
          <Navbar.Brand href="/" className="fs-3 fw-bold">Cozy Heaven</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#about" className="mx-2 fw-bold position-relative">
                About
                <span className="position-absolute bottom-0 start-50 translate-middle-x bg-info" style={{ height: '3px', width: '0', transition: 'width 0.3s ease-in-out' }}></span>
              </Nav.Link>
              <Nav.Link href="#reviews" className="mx-2 fw-bold position-relative">
                Reviews
                <span className="position-absolute bottom-0 start-50 translate-middle-x bg-info" style={{ height: '3px', width: '0', transition: 'width 0.3s ease-in-out' }}></span>
              </Nav.Link>
              <Button href="/login" variant="outline-light" className="ms-3 px-4 py-2 fw-bold" style={{ 
                background: 'linear-gradient(to right, #00AEEF, #00c6ff)',
                boxShadow: '0px 4px 10px rgba(0, 174, 239, 0.5)',
                borderRadius: '25px'
              }}>
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Signup Form Section */}
      <section className="py-5">
        <Container>
          <div className="bg-white rounded-3 shadow p-4 p-md-5 mx-auto" style={{ maxWidth: '800px' }}>
            <div className="text-center mb-4">
              <h2 className="text-primary fw-bold">Hotel Owner Registration</h2>
              <p className="text-muted">Provide your details for verification. Fields marked <span className="text-danger">*</span> are required.</p>
            </div>

            <Form onSubmit={handleSubmit}>
              <h3 className="text-primary mt-4 mb-3 pb-2 border-bottom border-primary">Owner Verification</h3>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Full Name (as per ID) <span className="text-danger">*</span></Form.Label>
                <Form.Control 
                  type="text" 
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required 
                  placeholder="Enter your full name"
                  className="rounded-3"
                  style={{ backgroundColor: '#F0F8FF' }}
                />
              </Form.Group>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Email ID <span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                      type="email" 
                      name="ownerEmail"
                      value={formData.ownerEmail}
                      onChange={handleChange}
                      required 
                      placeholder="you@example.com"
                      className="rounded-3"
                      style={{ backgroundColor: '#F0F8FF' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Password <span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                      type="password" 
                      name="ownerPassword"
                      value={formData.ownerPassword}
                      onChange={handleChange}
                      required 
                      placeholder="Create a strong password"
                      className="rounded-3"
                      style={{ backgroundColor: '#F0F8FF' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Phone Number <span className="text-danger">*</span></Form.Label>
                <Form.Control 
                  type="tel" 
                  name="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={handleChange}
                  required 
                  placeholder="+1 123-456-7890"
                  className="rounded-3"
                  style={{ backgroundColor: '#F0F8FF' }}
                />
                <Form.Text className="text-muted">We may send an OTP for verification.</Form.Text>
              </Form.Group>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Government ID Type <span className="text-danger">*</span></Form.Label>
                    <Form.Select 
                      name="ownerIdType"
                      value={formData.ownerIdType}
                      onChange={handleChange}
                      required
                      className="rounded-3"
                      style={{ backgroundColor: '#F0F8FF' }}
                    >
                      <option value="">Select ID Type</option>
                      <option value="aadhar">Aadhar Card</option>
                      <option value="passport">Passport</option>
                      <option value="drivers_license">Driver's License</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">ID Number <span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                      type="text" 
                      name="ownerIdNumber"
                      value={formData.ownerIdNumber}
                      onChange={handleChange}
                      required 
                      placeholder="Enter ID number"
                      className="rounded-3"
                      style={{ backgroundColor: '#F0F8FF' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Business Registration No.</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="businessRegNo"
                      value={formData.businessRegNo}
                      onChange={handleChange}
                      placeholder="Optional"
                      className="rounded-3"
                      style={{ backgroundColor: '#F0F8FF' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>GSTIN</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="gstin"
                      value={formData.gstin}
                      onChange={handleChange}
                      placeholder="Optional, if applicable"
                      className="rounded-3"
                      style={{ backgroundColor: '#F0F8FF' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Bank Account Details (for payouts)</Form.Label>
                <Form.Control 
                  type="text" 
                  name="bankDetails"
                  value={formData.bankDetails}
                  onChange={handleChange}
                  placeholder="e.g., Account Number, IFSC (Optional for now)"
                  className="rounded-3"
                  style={{ backgroundColor: '#F0F8FF' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Selfie/Live Verification</Form.Label>
                <Form.Control 
                  type="text" 
                  disabled
                  placeholder="Process handled during admin review (Optional)"
                  className="rounded-3"
                />
                <Form.Text className="text-muted">Upload might be requested later.</Form.Text>
              </Form.Group>

              <h3 className="text-primary mt-5 mb-3 pb-2 border-bottom border-primary">Hotel Verification</h3>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Hotel Name <span className="text-danger">*</span></Form.Label>
                <Form.Control 
                  type="text" 
                  name="hotelName"
                  value={formData.hotelName}
                  onChange={handleChange}
                  required 
                  placeholder="Official hotel name"
                  className="rounded-3"
                  style={{ backgroundColor: '#F0F8FF' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Hotel Address <span className="text-danger">*</span></Form.Label>
                <Form.Control 
                  type="text" 
                  name="hotelAddress"
                  value={formData.hotelAddress}
                  onChange={handleChange}
                  required 
                  placeholder="Street Address, Area"
                  className="rounded-3"
                  style={{ backgroundColor: '#F0F8FF' }}
                />
              </Form.Group>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">City <span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                      type="text" 
                      name="hotelCity"
                      value={formData.hotelCity}
                      onChange={handleChange}
                      required 
                      placeholder="City"
                      className="rounded-3"
                      style={{ backgroundColor: '#F0F8FF' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">State/Region <span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                      type="text" 
                      name="hotelState"
                      value={formData.hotelState}
                      onChange={handleChange}
                      required 
                      placeholder="State"
                      className="rounded-3"
                      style={{ backgroundColor: '#F0F8FF' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">ZIP/Postal Code <span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                      type="text" 
                      name="hotelZip"
                      value={formData.hotelZip}
                      onChange={handleChange}
                      required 
                      placeholder="Postal Code"
                      className="rounded-3"
                      style={{ backgroundColor: '#F0F8FF' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Country <span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                      type="text" 
                      name="hotelCountry"
                      value={formData.hotelCountry}
                      onChange={handleChange}
                      required 
                      placeholder="Country"
                      className="rounded-3"
                      style={{ backgroundColor: '#F0F8FF' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Hotel Contact Email <span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                      type="email" 
                      name="hotelContactEmail"
                      value={formData.hotelContactEmail}
                      onChange={handleChange}
                      required 
                      placeholder="hotel@example.com"
                      className="rounded-3"
                      style={{ backgroundColor: '#F0F8FF' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Hotel Contact Phone <span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                      type="tel" 
                      name="hotelContactPhone"
                      value={formData.hotelContactPhone}
                      onChange={handleChange}
                      required 
                      placeholder="Hotel reception phone"
                      className="rounded-3"
                      style={{ backgroundColor: '#F0F8FF' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Hotel License/Registration Certificate <span className="text-danger">*</span></Form.Label>
                <Form.Control 
                  type="text" 
                  name="hotelLicense"
                  value={formData.hotelLicense}
                  onChange={handleChange}
                  required 
                  placeholder="Enter License Number or upload reference"
                  className="rounded-3"
                  style={{ backgroundColor: '#F0F8FF' }}
                />
                <Form.Text className="text-muted">Proof might be requested via email.</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Property Ownership Proof <span className="text-danger">*</span></Form.Label>
                <Form.Select 
                  name="propertyProofType"
                  value={formData.propertyProofType}
                  onChange={handleChange}
                  required
                  className="rounded-3 mb-2"
                  style={{ backgroundColor: '#F0F8FF' }}
                >
                  <option value="">Select Proof Type</option>
                  <option value="bill">Utility Bill (Recent)</option>
                  <option value="agreement">Rental Agreement</option>
                  <option value="deed">Property Deed</option>
                </Form.Select>
                <Form.Control 
                  type="text" 
                  name="propertyProof"
                  value={formData.propertyProof}
                  onChange={handleChange}
                  placeholder="Enter Reference or upload details"
                  className="rounded-3"
                  style={{ backgroundColor: '#F0F8FF' }}
                />
                <Form.Text className="text-muted">Proof might be requested via email.</Form.Text>
              </Form.Group>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Star Rating</Form.Label>
                    <Form.Select 
                      name="starRating"
                      value={formData.starRating}
                      onChange={handleChange}
                      className="rounded-3"
                      style={{ backgroundColor: '#F0F8FF' }}
                    >
                      <option value="">Select Rating (Optional)</option>
                      <option value="1">1 Star</option>
                      <option value="2">2 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="5">5 Stars</option>
                      <option value="unrated">Unrated/Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Safety Certificates</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="safetyCerts"
                      value={formData.safetyCerts}
                      onChange={handleChange}
                      placeholder="e.g., Fire Safety (Optional)"
                      className="rounded-3"
                      style={{ backgroundColor: '#F0F8FF' }}
                    />
                    <Form.Text className="text-muted">Mention key compliance.</Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label>Photos of Hotel (URLs)</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3}
                  name="hotelPhotos"
                  value={formData.hotelPhotos}
                  onChange={handleChange}
                  placeholder="Enter image URLs separated by commas (e.g., https://.../lobby.jpg, https://.../room1.jpg)"
                  className="rounded-3"
                  style={{ backgroundColor: '#F0F8FF' }}
                />
                <Form.Text className="text-muted">Provide links to front view, lobby, rooms, amenities.</Form.Text>
              </Form.Group>

              <div className="text-center mt-4">
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="px-4 py-2 fw-bold rounded-pill"
                  style={{
                    background: 'linear-gradient(to right, #0066cc, #00AEEF)',
                    border: 'none',
                    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <FaUserPlus className="me-2" /> Submit for Verification
                </Button>
              </div>

              <div className="text-center mt-3">
                <span>Already have an account?</span> <a href="/login" className="text-primary ms-1 fw-bold">Login Here</a>
              </div>
            </Form>
          </div>
        </Container>
      </section>

      {/* Success Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="text-success fw-bold">Verification Request Sent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Thank you for registering! Your details have been submitted for verification. 
            Our team will review your application and get back to you via email within 
            2-3 business days. You will be notified once your account is approved.
          </p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button 
            variant="primary" 
            onClick={() => setShowModal(false)}
            className="rounded-pill px-4"
            style={{
              background: 'linear-gradient(to right, #0066cc, #00AEEF)',
              border: 'none'
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3 mt-4">
        <Container>
          <p className="mb-0">© 2025 Cozy Heaven Stay. All Rights Reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default OwnerSignup;