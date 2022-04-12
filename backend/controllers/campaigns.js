const campaignsRouter = require('express').Router();
const Campaign = require('../models/campaign');
const User = require('../models/user');
const upload = require('../multer');
const cloudinary = require('../cloudinary');
const fs = require("fs")
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

campaignsRouter.post('/', userExtractor, upload.array('files'), async (request, response) => {
  const uploader = async (path) => await cloudinary.uploads(path, 'fundraisr');

  const body = request.body;
  const user = request.user;

  let url;
  const files = request.files;
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path)
    url = newPath;
    fs.unlinkSync(path);
  }
  console.log(url)
  const campaign = new Campaign ({
    title: body.title,
    description: body.description,
    userCreated: user._id.toString(),
    amountTarget: body.amountTarget,
    dateStart: new Date().toISOString(),
    dateEnd: body.dateEnd,
    image: url,
    tags: body.tags.split(',')
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
  const campaignId = campaign.userCreated.toString();

  if (campaignId === userId) {
    const updatedCampaign = await Campaign
      .findByIdAndUpdate(request.params.id, body, {new: true});
    if (updatedCampaign) {
      response.json(updatedCampaign)
    }
  } else {
    response.status(401).send({ error: 'Unauthorised' });
  }
})

campaignsRouter.put('/edit/donation/:id', userExtractor, async (request, response) => {
  
  const body = request.body;
  const userId = request.user._id.toString();
  console.log('here')
  const userDonated = request.body.amountDonated;
  const campaign = await Campaign.findById(request.params.id);
  if (!campaign) {
    if (!campaign) {
    response.status(404).end()
  }
  const updatedCampaign = await Campaign.findByIdAndUpdate(request.params.id, body, {new: true});
  if (updatedCampaign) {
  response.json(updatedCampaign)
  } else {
  response.status(401).send({ error: 'Unauthorised' });
  }
    }
    console.log('here2')
    const updatedCampaign = await Campaign.findByIdAndUpdate(request.params.id, {donors: userId, $inc: {amountDonated: +userDonated} }, {new: true});
    console.log('here3')
    
    const updatedUser = await User.findByIdAndUpdate(userId, {campaignDonated: request.params.id, amountDonated: userDonated}, {new: true});
  // }
  
  if (updatedCampaign && updatedUser) {
    response.json(updatedCampaign)
    } else {
    response.status(401).send({ error: 'Unauthorised' });
    }
})


// campaignsRouter.put('/edit/donation/:id', userExtractor, async (request, response) => {
//   const body = request.body;
//   const campaign = await Campaign.findById(request.params.id);
//   if (!campaign) {
//     response.status(404).end()
//   }
//   const updatedCampaign = await Campaign.findByIdAndUpdate(request.params.id, body, {new: true});
//   if (updatedCampaign) {
//   response.json(updatedCampaign)
//   } else {
//   response.status(401).send({ error: 'Unauthorised' });
//   }
// })

campaignsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const userId = user._id.toString();
  const campaign = await Campaign.findById(request.params.id)
  if (!campaign) {
    response.status(404).end()
  }

  if (campaign.userCreated.toString() === userId) {
    await Campaign.findByIdAndRemove(request.params.id)
    const newCampaignsCreated = user.campaignsCreated.filter(id => id.toString() !== campaign._id.toString())
    await User.findByIdAndUpdate(userId, { campaignsCreated: newCampaignsCreated }, { new: true })
    response.status(204).end()
  } else {
    response.status(401).send({ error: 'Unauthorised' });
  }
})

module.exports = campaignsRouter;