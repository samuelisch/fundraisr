const campaignsRouter = require('express').Router();
const Campaign = require('../models/campaign');
const User = require('../models/user');
const userExtractor = require('../utils/middleware').userExtractor;

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

campaignsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const userDetails = {
    id: user._id.toString(),
    name: user.name,
    email: user.email
  }

  const campaign = new Campaign ({
    title: body.title,
    description: body.description,
    userCreated: userDetails,
    amountTarget: body.amountTarget,
    dateStart: new Date().toISOString(),
    // dateEnd
  })

  const savedCampaign = await campaign.save()
  const updatedCampaigns = user.campaignsCreated.concat(savedCampaign._id)
  await User.findByIdAndUpdate(user._id, { campaignsCreated: updatedCampaigns})

  response.json(savedCampaign)
})

campaignsRouter.put('/edit/:id', userExtractor, async (request, response) => {
  const body = request.body;
  const userId = request.user._id.toString();
  const campaign = await Campaign.findById(request.params.id);
  if (!campaign) {
    response.status(404).end()
  }

  if (campaign.userCreated.id === userId) {
    const updatedCampaign = await Campaign
      .findByIdAndUpdate(request.params.id, body, {new: true});
    if (updatedCampaign) {
      response.json(updatedCampaign)
    }
  } else {
    response.status(401).send({ error: 'Unauthorised' });
  }
})

campaignsRouter.delete('/:id', userExtractor, async (request, response) => {
  // define user in current session
  const deletedCampaign = await Campaign.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = campaignsRouter;