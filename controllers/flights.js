import { Flight } from "../models/flight.js"

function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render("flights/index",{
      title: "All Flights",
      flights: flights,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newFlight (req, res) {
  const newFlight = new Flight();
// Obtain the default date
  const dt = newFlight.departs;
// Format the date for the value attribute of the input
  const departsDate = dt.toISOString().slice(0, 16)
  res.render("flights/new", {
    title: "New Flight",
    departsDate,
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
	}
  Flight.create(req.body)
  .then(flight => {
    res.redirect("/flights")
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}

function show(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render("flights/show", {
      title: "Flight Details",
      flight: flight
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight=> {
    res.redirect("/flights")
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function edit(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight=> {
    res.render("flights/edit",{
      title: "Edit Flight",
      flight,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function update(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
	}
  Flight.findByIdAndUpdate(req.params.flightId,req.body,{new:true})
  .then(flight=> {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/show')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight =>{
    flight.tickets.push(req.body)
    flight.save()
    .then(()=>{
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
}