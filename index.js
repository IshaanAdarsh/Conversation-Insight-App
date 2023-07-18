const { WebClient } = require('@slack/web-api');

// Create a new instance of the WebClient
const client = new WebClient('xoxp-5544854063461-5547785867586-5578106701847-530e436ee368da453ca6a97805b4da5f');

// Define the function to retrieve conversation details
async function getConversationInfo(conversationId) {
  try {
    const response = await client.conversations.info({ channel: conversationId });
    const conversationDetails = response.channel;
    return conversationDetails;
  } catch (error) {
    console.error('Failed to retrieve conversation details:', error);
    throw error;
  }
}

// Use the function to retrieve conversation details
const conversationId = 'C05GTEL948Y'; // Replace with your desired conversation ID

getConversationInfo(conversationId)
  .then(conversationDetails => {
    console.log('Conversation Details:', conversationDetails);
  })
  .catch(error => {
    console.error('Error:', error);
  });
