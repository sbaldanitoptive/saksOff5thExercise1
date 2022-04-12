const React = require('react');
const {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Image,
} = require('react-bootstrap');

const DefaultLayout = require('./layouts/default');

function ProductsList(props) {
  return (
    <DefaultLayout {...props}>
      <h2 className="text-center mb-3">Products</h2>
      <ListGroup>
        {props.products.map((product) => (
          <ListGroup.Item key={product.id}>
            <Container fluid>
              <Row>
                <Col md="auto">
                  <div className="align-items-center d-flex h-100">
                    <Image
                      width={128}
                      height={128}
                      src={
                        product.Images[0]
                          ? product.Images[0].url
                          : '/img/default.png'
                      }
                    />
                  </div>
                </Col>
                <Col>
                  <form action="/orders" method="post" target="_self">
                    <p className="mb-1 small">{`SKU: ${product.SKU}`}</p>
                    <p className="mb-1 fw-bold text-success">{`$${product.price}`}</p>
                    <p className="mb-1">{`Items left: ${product.inventory}`}</p>
                    <p className="mb-1">{`Delivery time: ${product.deliveryTimeBusinessDaysMin}-${product.deliveryTimeBusinessDaysMax} days`}</p>
                    <input
                      id="productId"
                      name="productId"
                      type="hidden"
                      value={product.id}
                    />
                    <input
                      id="userId"
                      name="userId"
                      type="hidden"
                      value={props.user.id}
                    />
                    <Button variant="primary" type="submit">
                      Buy Now!
                    </Button>
                  </form>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </DefaultLayout>
  );
}

module.exports = ProductsList;
