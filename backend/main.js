const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://test:test@cluster0.p6mubov.mongodb.net/?retryWrites=true&w=majority",
  {useNewUrlParser: true, useUnifiedTopology: true}
)

const paymentSchema = new mongoose.Schema({
  id: String,
  payid: String,
  isPaid: Boolean,
});

const Payment = mongoose.model("Payment", paymentSchema)

module.exports = {
  Payment
}
