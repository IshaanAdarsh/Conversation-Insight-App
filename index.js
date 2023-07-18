const { WebClient } = require('@slack/web-api');

// Create a new instance of the WebClient
const client = new WebClient('xoxp-5544854063461-5547785867586-5608566993233-67cdab3bdc73090ef0602d2da4ffadca');

// Define the function to retrieve conversation details
async function getConversationInfo(conversationId) {
  try {
    const response = await client.conversations.info({
      channel: conversationId,
      include_num_members: true,
      include_locale: true,
      include_latest: true,
    });

    const conversationDetails = response.channel;
    return conversationDetails;
  } catch (error) {
    console.error('Failed to retrieve conversation details:', error);
    throw error;
  }
}

// Format and display conversation details
function displayConversationDetails(conversationDetails) {
  console.log('------------------------------------');
  console.log('Conversation ID:', conversationDetails.id);
  console.log('Name:', conversationDetails.name);
  console.log('Type:', conversationDetails.is_channel ? 'Channel' : 'Group');
  console.log('Members:', conversationDetails.num_members);
  console.log('Created:', new Date(conversationDetails.created * 1000).toLocaleString());
  console.log('Purpose:', conversationDetails.purpose.value);

  // Check if latest message exists before accessing its text property
  if (conversationDetails.latest && conversationDetails.latest.text) {
    console.log('Latest Message:', conversationDetails.latest.text);
  } else {
    console.log('Latest Message: No message available');
  }
  
  console.log('------------------------------------');
}


// Use the function to retrieve conversation details
const conversationId = 'C05GTEL948Y'; // Replace with your desired conversation ID

getConversationInfo(conversationId)
  .then(conversationDetails => {
    displayConversationDetails(conversationDetails);
  })
  .catch(error => {
    console.error('Error:', error);
  });
