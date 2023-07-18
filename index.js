const { WebClient } = require('@slack/web-api');

// Create a new instance of the WebClient
const client = new WebClient('xoxp-5544854063461-5547785867586-5619679615920-98846292c897d82f2845e5e991538008');

// Define the function to retrieve conversation details
async function getConversationInfo(conversationId) {
  try {
    const response = await client.conversations.info({
      channel: conversationId,
      include_num_members: true,
      include_locale: true,
      include_latest: true,
      include_purpose: true,
      include_topic: true,
      include_counts: true,
      include_member_user_ids: true,
      include_shared: true,
      include_ext_shared_channel: true,
      include_pin_counts: true,
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
  console.log('Is Archived:', conversationDetails.is_archived ? 'Yes' : 'No');
  console.log('Is General:', conversationDetails.is_general ? 'Yes' : 'No');
  console.log('Purpose:', conversationDetails.purpose.value || 'Not specified');
  console.log('Topic:', conversationDetails.topic.value || 'Not specified');
  console.log('Last Read Message:', conversationDetails.last_read);
  console.log('Unlinked Members:', conversationDetails.unlinked);
  console.log('Parent Conversation ID:', conversationDetails.parent_conversation || 'None');
  console.log('Creator:', conversationDetails.creator);
  console.log('Is Shared:', conversationDetails.is_shared ? 'Yes' : 'No');
  console.log('Is Org Shared:', conversationDetails.is_org_shared ? 'Yes' : 'No');
  console.log('Shared Team IDs:', conversationDetails.shared_team_ids.join(', '));
  console.log('Pending Shared:', conversationDetails.pending_shared.join(', '));
  console.log('Context Team ID:', conversationDetails.context_team_id);
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
