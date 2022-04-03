const campaignsRouter = require('express').Router();
const Campaign = require('../models/campaign');
const { findByIdAndRemove } = require('../models/user');
const User = require('../models/user');

campaignsRouter.get('/', async (request, response) => {
  const fetchedCampaigns = await Campaign.find({})
  response.json(fetchedCampaigns)
})

campaignsRouter.get("/:id", async (request, response) => {
  const campaign = await Campaign.findById(request.params.id)
  if (campaign) {
    response.json(campaign)
  } else {
    response.status(404).end();
  }
})

campaignsRouter.post('/', async (request, response) => {
  const body = request.body;
  // define user in current session logged in

  const campaign = new Campaign ({
    title: body.title,
    description: body.description,
    // userCreated:
    amountTarget: body.amountTarget,
    dateStart: new Date().toISOString(),
    // dateEnd
  })

  const savedCampaign = await campaign.save()
  // update user instance creating this post
  response.json(savedCampaign)
})

campaignsRouter.delete('/:id', async (request, response) => {
  // define user in current session
  const deletedCampaign = await Campaign.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = campaignsRouter;