const React = require('react');
const {
  Form,
  Button,
  Container,
  FloatingLabel,
  Row,
  Col,
  Alert,
} = require('react-bootstrap');
const map = require('lodash/map');

const DefaultLayout = require('./layouts/default');
const { CATEGORY } = require('../helpers/types');

function SingleProductForm() {
  return (
    <React.Fragment>
      <h1 className="text-center">Add A Single Product</h1>
      <Container fluid className="p-3 mb-5">
        <Form
          className="d-flex flex-column"
          action="/products"
          method="post"
          encType="multipart/form-data"
          target="_self"
        >
          <input id="fromWeb" name="fromWeb" type="hidden" value={true} />
          <FloatingLabel label="SKU" className="mb-3" controlId="SKU">
            <Form.Control
              required
              type="text"
              name="SKU"
              defaultValue="UIA7824289912"
            />
          </FloatingLabel>

          <FloatingLabel label="Price" className="mb-3" controlId="price">
            <Form.Control
              required
              type="number"
              name="price"
              defaultValue="220.12"
            />
          </FloatingLabel>

          <FloatingLabel
            label="Inventory"
            className="mb-3"
            controlId="inventory"
          >
            <Form.Control type="number" name="inventory" defaultValue="50" />
          </FloatingLabel>

          <Form.Group className="mb-3">
            <Row>
              <Col className="align-items-center d-flex">
                <Form.Label>Delivery Time in Business Days</Form.Label>
              </Col>
              <Col>
                <FloatingLabel label="Min">
                  <Form.Control
                    type="number"
                    name="deliveryTimeBusinessDaysMin"
                    defaultValue="3"
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel label="Max">
                  <Form.Control
                    type="number"
                    name="deliveryTimeBusinessDaysMax"
                    defaultValue="5"
                  />
                </FloatingLabel>
              </Col>
            </Row>
          </Form.Group>

          <FloatingLabel label="Category" className="mb-3" controlId="category">
            <Form.Select className="text-capitalize" name="category">
              {map(CATEGORY, (category) => (
                <option
                  key={category}
                  value={category}
                  selected={category === CATEGORY.OTHER}
                >
                  {category.toLowerCase()}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>

          <Form.Group as={Row} className="mb-3" controlId="image">
            <Form.Label column sm={2}>
              Image
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="file" name="image" />
            </Col>
          </Form.Group>

          <Form.Check
            type="switch"
            className="mb-3"
            label="Is Active?"
            name="isActive"
            defaultChecked
          />

          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

function ImportProductsForm() {
  return (
    <React.Fragment>
      <h1 className="text-center mt-5">Import a List of Products</h1>
      <Container fluid className="p-3">
        <Alert className="text-center small fst-italic">
          {`File should be in CSV format and contain the columns: "SKU", "price", "inventory",` +
            ` "deliveryTimeBusinessDaysMin", "deliveryTimeBusinessDaysMax", "isActive" and "category"`}
        </Alert>
        <Form
          className="d-flex flex-column"
          action="/products-import"
          method="post"
          encType="multipart/form-data"
          target="_self"
        >
          <input id="fromWeb" name="fromWeb" type="hidden" value={true} />

          <Form.Group as={Row} className="mb-3" controlId="file">
            <Form.Label column sm={2}>
              Products List
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="file" name="file" />
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit">
            Upload
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

function CreateProducts(props) {
  return (
    <DefaultLayout {...props}>
      <SingleProductForm />
      <ImportProductsForm />
    </DefaultLayout>
  );
}

module.exports = CreateProducts;
