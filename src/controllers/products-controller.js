// Import Database
const database = require("../config").promise();
// Import Validation Schema
const {
  addNewProductSchema,
  updateProductSchema,
} = require("../helpers/validation-schema");

// GET ALL PRODUCTS
module.exports.getProducts = async (req, res) => {
  // Define Query
  const GET_PRODUCTS = `
    select p.id, p.name, p.description, p.price, u.unit
    from products as p
    join uom as u on p.uom_id = u.id; 
    `;
  // Execute Query
  try {
    const [PRODUCTS] = await database.execute(GET_PRODUCTS);
    return res.status(200).send(PRODUCTS);
  } catch (error) {
    console.log("ERROR :", error);
    return res.status(500).send("internal service Error");
  }
};

// GET PRODUCT BY ID
module.exports.getProductById = async (req, res) => {
  // Capture Product Id
  const productId = req.params.productId;
  // Define Query
  const GET_PRODUCT_BY_ID = `
  select p.id, p.name, p.description, p.price, u.unit
  from products as p
  join uom as u on p.uom_id = u.id
  where p.id = ?
  `;
  // Execute Query
  try {
    const [PRODUCT] = await database.execute(GET_PRODUCT_BY_ID, [productId]);
    return res.status(200).send(PRODUCT[0]);
  } catch (error) {
    console.log("ERROR :", error);
    return res.status(500).send("internal service Error");
  }
};

// ADD NEW PRODUCT
module.exports.addProduct = async (req, res) => {
  //validate value
  const { error } = addNewProductSchema.validate(req.body);
  if (error) {
    console.log("ERROR :", error);
    return res.status(400).send(error.details[0].message);
  }
  //Capture all value from frontend
  const { name, description, price, unit } = req.body;

  try {
    // Check product name if already exist
    const CHECK_PRODUCT = `
    select * from products where name = ?
    `;
    const [RESULT] = await database.execute(CHECK_PRODUCT, [name]);
    if (RESULT.length) {
      return res.status(400).send("Product already exist");
    }
    // Generate Product Id
    const generator = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    const productId = generator();
    // create query insert
    const INSERT_PRODUCT = `insert into products (id, name, description, price, uom_id) values(?,?,?,?,?)`;
    // execute query
    console.log(productId, name, description, price, unit);
    await database.execute(INSERT_PRODUCT, [
      productId,
      name,
      description,
      price,
      unit,
    ]);
    // send response
    return res.status(201).send(`${name} has been added successfully!`);
  } catch (error) {
    console.log("ERROR :", error);
    return res.status(500).send("Internal Service Error");
  }
};

// DELETE PRODUCT
module.exports.deleteProduct = async (req, res) => {
  // Capture Product ID
  const productId = req.params.productId;

  try {
    // Check product by its ID
    const CHECK_PRODUCT = `
    select * from products where id = ?
    `;
    const [RESULT] = await database.execute(CHECK_PRODUCT, [productId]);
    if (!RESULT.length) {
      return res.status(400).send("Product Not Found");
    }
    // Define query delete
    const DELETE_PRODUCT = `
    delete from products where id = ?
    `;
    //execute query
    const [INFO] = await database.execute(DELETE_PRODUCT, [productId]);
    console.log("INFO :", INFO);
    // send respond to client
    return res.status(200).send(`${RESULT[0].name} Has Been Deleted`);
  } catch (error) {
    console.log("ERROR :", error);
    return res.status(500).send("Internal Service Error");
  }
};

//UPDATE PRODUCT
module.exports.updateProduct = async (req, res) => {
  // Capture ProductId
  const productId = req.params.productId;
  // Capture new value
  const body = req.body;

  try {
    // CHECK IF THE BODY IS EMPTY
    const isEmpty = !Object.values(body).length;
    if (isEmpty) {
      return res.status(404).send("Please specify data you want to update");
    }
    // Validate Req Body
    const { error } = updateProductSchema.validate(body);
    if (error) {
      return res.status(404).send(error.details[0].message);
    }

    // Define Query Update
    let values = [];
    for (let key in body) {
      values.push(`${key} = '${body[key]}'`);
    }

    const UPDATE_PRODUCT = `
    update products set ${values} where id = ?
    `;
    await database.execute(UPDATE_PRODUCT, [productId]);

    // Send Respond
    res.status(200).send("Product Has Been Updated");
  } catch (error) {
    console.log("ERROR : ", error);
    return res.status(500).send("Internal Service Error");
  }
};
