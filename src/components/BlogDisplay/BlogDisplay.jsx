import React from 'react';
import { Box, Typography, Button, styled } from '@mui/material';

// Styled components for the blog layout
const BlogDetailsBox = styled(Box)`
  background-color: #f9f9f9;
  padding: 1.5rem;
  margin-top: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;  // Increased height to accommodate 3 lines of content
  width: 30%;  // Make the boxes smaller to fit 3 in a row
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;

  // Make the box responsive to fit in one row on smaller screens
  @media (max-width: 900px) {
    width: 45%;  // 2 items in a row on medium screens
  }

  @media (max-width: 600px) {
    width: 100%;  // Single item in a row on small screens
  }
`;

const FooterContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  flex-direction: column; // Stack footer content vertically
`;

const BlogTitle = styled(Typography)`
  font-size: 1.2rem;  // Decreased size of the title
  font-weight: bold;
  color: #333;
`;

const BlogTopic = styled(Typography)`
  font-size: 1rem;
  color: #555;
  margin-top: 0.5rem;
`;

const BlogContent = styled(Typography)`
  font-size: 0.95rem;
  margin-top: 1rem;
  color: #333;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;  // Display only 3 lines
  -webkit-box-orient: vertical;
`;

const NameTimeContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 0.875rem;
  color: #777;
`;

const ReadMoreButton = styled(Button)`
  background-color: transparent;
  color: #007bff;
  font-size: 0.875rem;
  padding: 0;
  margin-top: 0;
  text-transform: none;
  width: 100%;  // Make button the same width as content
  &:hover {
    color: #0056b3;  // Change text color on hover
  }
`;

const demoData = [
    {
      title: "The Future of Artificial Intelligence",
      topic: "Technology",
      content: "Artificial Intelligence (AI) is rapidly transforming the world. From autonomous vehicles to virtual assistants, AI is revolutionizing industries. However, with these advancements come significant challenges, including ethical concerns and the need for regulation. AI holds the potential to improve our lives, but it also requires careful management to ensure its benefits are maximized and its risks minimized.",
      author: "John Doe",
      date: "January 22, 2025",
    },
    {
      title: "A Guide to Sustainable Living",
      topic: "Lifestyle",
      content: "Sustainability is the key to ensuring the future of our planet. Adopting eco-friendly habits like reducing waste, conserving energy, and choosing sustainable products can make a big difference. As individuals, it's our responsibility to make conscious choices that contribute to the well-being of the Earth. Small changes in daily life can collectively lead to a much larger impact on the environment.",
      author: "Jane Smith",
      date: "January 18, 2025",
    },
    {
      title: "Exploring the Wonders of Space",
      topic: "Science",
      content: "Space exploration has fascinated humanity for centuries, and with modern advancements, we are now closer than ever to unlocking the mysteries of the universe. From the launch of the James Webb Space Telescope to the ongoing missions to Mars, space agencies around the world are pushing the boundaries of knowledge. As we continue exploring, the question arises: What is our place in the cosmos?",
      author: "Robert White",
      date: "January 15, 2025",
    },
    {
      title: "Top 10 Travel Destinations for 2025",
      topic: "Travel",
      content: "As travel restrictions ease and the world slowly returns to normal, 2025 promises to be an exciting year for globetrotters. Whether you're looking for adventure, culture, or relaxation, there are incredible destinations waiting for you. From the serene beaches of Bali to the bustling streets of Tokyo, these top 10 travel destinations should be on your bucket list. Pack your bags and get ready for an unforgettable journey!",
      author: "Sarah Lee",
      date: "January 10, 2025",
    },
    {
      title: "The Importance of Mental Health Awareness",
      topic: "Health",
      content: "Mental health has become an increasingly important topic in recent years, with more individuals recognizing the impact of mental well-being on overall health. From managing stress to seeking therapy, the importance of prioritizing mental health cannot be overstated. Creating a culture of open conversation and support is vital in reducing stigma and improving access to mental health care.",
      author: "Emily Johnson",
      date: "January 5, 2025",
    },
    {
      title: "The Rise of Remote Work",
      topic: "Business",
      content: "Remote work has become the new norm for many industries, driven by advancements in technology and the global pandemic. With the ability to work from anywhere, employees have greater flexibility, while companies benefit from access to a global talent pool. However, managing remote teams comes with its own set of challenges, including maintaining communication and team cohesion. As the future of work evolves, remote models will continue to shape business landscapes.",
      author: "Michael Brown",
      date: "January 3, 2025",
    },
    {
      title: "The Art of Photography: Tips for Beginners",
      topic: "Photography",
      content: "Photography is more than just taking pictures; it's about capturing moments, emotions, and stories. For beginners, mastering the basics such as lighting, composition, and camera settings can significantly improve the quality of your photos. Whether you are using a DSLR or a smartphone, understanding the principles of photography can elevate your skills and help you create stunning images.",
      author: "David Clark",
      date: "December 29, 2024",
    },
    {
      title: "Cooking Tips: Easy Meals for Busy People",
      topic: "Food",
      content: "In today's fast-paced world, finding time to prepare meals can be challenging. However, with a little planning, you can make delicious and healthy meals in no time. Quick and easy recipes, like stir-fries, salads, and one-pot dishes, are perfect for busy individuals. Incorporating fresh ingredients and simple techniques can help you create meals that are both nutritious and satisfying.",
      author: "Olivia Adams",
      date: "December 25, 2024",
    },
    {
      title: "How to Build a Successful Startup",
      topic: "Business",
      content: "Starting a business can be an exciting and rewarding venture, but it comes with its own set of challenges. From securing funding to building a customer base, entrepreneurs must navigate a variety of obstacles. Understanding the market, having a clear business plan, and staying committed to the vision are key components of building a successful startup. With hard work and perseverance, success is achievable.",
      author: "James Harris",
      date: "December 22, 2024",
    },
    {
      title: "Exploring the Oceans: A Deep Dive into Marine Biology",
      topic: "Science",
      content: "The oceans are home to an incredible diversity of life, much of which remains unexplored. Marine biology plays a crucial role in understanding ocean ecosystems, from the smallest plankton to the largest whales. Research in this field not only helps protect marine species but also provides valuable insights into the health of our planet's oceans. As human activity continues to impact the oceans, marine biologists work tirelessly to conserve and study marine life.",
      author: "Sophia Turner",
      date: "December 20, 2024",
    },
    {
        title: "Cooking Tips: Easy Meals for Busy People",
        topic: "Food",
        content: "In today's fast-paced world, finding time to prepare meals can be challenging. However, with a little planning, you can make delicious and healthy meals in no time. Quick and easy recipes, like stir-fries, salads, and one-pot dishes, are perfect for busy individuals. Incorporating fresh ingredients and simple techniques can help you create meals that are both nutritious and satisfying.",
        author: "Olivia Adams",
        date: "December 25, 2024",
      },
  ];
  
const BlogDisplay = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {/* Loop through the demo data and display each blog entry */}
      {demoData.map((blog, index) => (
        <BlogDetailsBox key={index}>
          <BlogTitle>{blog.title}</BlogTitle>
          <BlogTopic>{blog.topic}</BlogTopic>
          <BlogContent>{blog.content}</BlogContent>

          <FooterContainer>
            <ReadMoreButton>Read More</ReadMoreButton>
            <NameTimeContainer>
              <Typography>{blog.author}</Typography>
              <Typography>{blog.date}</Typography>
            </NameTimeContainer>
          </FooterContainer>
        </BlogDetailsBox>
      ))}
    </div>
  );
};

export default BlogDisplay;