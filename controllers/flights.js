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
  res.render("flights/new", {
    title: "New Flight"
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
    res.redirect('/movies/new')
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
    res.redirect('/movies')
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
}