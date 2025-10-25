// Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessages');

    if (chatbotToggle && chatbotContainer) {
        chatbotToggle.addEventListener('click', () => {
            chatbotContainer.classList.toggle('active');
        });

        chatbotClose.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
        });

        // Quick reply functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-reply')) {
                const reply = e.target.getAttribute('data-reply');
                addMessage(reply, 'user');
                processMessage(reply);
            }
        });

        if (chatbotSend && chatbotInput) {
            chatbotSend.addEventListener('click', sendMessage);
            chatbotInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }

        function sendMessage() {
            const message = chatbotInput.value.trim();
            if (message) {
                addMessage(message, 'user');
                processMessage(message);
                chatbotInput.value = '';
            }
        }

        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', `${sender}-message`);
            messageDiv.textContent = text;
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        function addBotMessageWithReplies(text, replies) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'bot-message');
            messageDiv.innerHTML = text;
            
            if (replies && replies.length > 0) {
                const repliesDiv = document.createElement('div');
                repliesDiv.classList.add('quick-replies');
                
                replies.forEach(reply => {
                    const replyBtn = document.createElement('div');
                    replyBtn.classList.add('quick-reply');
                    replyBtn.setAttribute('data-reply', reply.toLowerCase());
                    replyBtn.textContent = reply;
                    repliesDiv.appendChild(replyBtn);
                });
                
                messageDiv.appendChild(repliesDiv);
            }
            
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        function processMessage(message) {
            const lowerMessage = message.toLowerCase();
            
            // Simulate typing delay
            setTimeout(() => {
                if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
                    addBotMessageWithReplies("Hello! I'm your NexaTech assistant. How can I help you today?", 
                        ["Our Services", "Pricing", "Contact"]);
                } 
                else if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
                    addBotMessageWithReplies("We offer three main services:<br><br>" +
                        "• <strong>Web Development</strong> - Custom, responsive websites<br>" +
                        "• <strong>Digital Marketing</strong> - SEO and online campaigns<br>" +
                        "• <strong>Branding</strong> - Complete brand identity<br><br>" +
                        "Which service are you interested in?",
                        ["Web Development", "Digital Marketing", "Branding", "Pricing"]);
                }
                else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
                    addBotMessageWithReplies("Our project pricing typically ranges from:<br><br>" +
                        "<div class='price-display'>₹1,500 – ₹12,500 INR</div>" +
                        "The exact cost depends on your project requirements. Would you like me to help you with a specific service?",
                        ["Web Development", "Digital Marketing", "Branding", "Contact Form"]);
                }
                else if (lowerMessage.includes('web development') || lowerMessage.includes('website')) {
                    addBotMessageWithReplies("Our web development services include:<br><br>" +
                        "• Responsive website design<br>" +
                        "• E-commerce solutions<br>" +
                        "• CMS integration<br>" +
                        "• Progressive web apps<br><br>" +
                        "Starting from ₹3,500 INR for basic sites. Would you like to discuss your project?",
                        ["Yes, Contact Form", "Pricing Details", "Other Services"]);
                }
                else if (lowerMessage.includes('digital marketing') || lowerMessage.includes('seo') || lowerMessage.includes('marketing')) {
                    addBotMessageWithReplies("Our digital marketing services include:<br><br>" +
                        "• SEO optimization<br>" +
                        "• Social media marketing<br>" +
                        "• Content strategy<br>" +
                        "• PPC advertising<br><br>" +
                        "Packages start from ₹2,500 INR. Ready to boost your online presence?",
                        ["Yes, Contact Form", "Pricing Details", "Other Services"]);
                }
                else if (lowerMessage.includes('branding') || lowerMessage.includes('logo') || lowerMessage.includes('design')) {
                    addBotMessageWithReplies("Our branding services include:<br><br>" +
                        "• Logo & identity design<br>" +
                        "• Brand guidelines<br>" +
                        "• UI/UX design<br>" +
                        "• Print & digital assets<br><br>" +
                        "Starting from ₹1,500 INR for basic logo design. Need a brand refresh?",
                        ["Yes, Contact Form", "Pricing Details", "Other Services"]);
                }
                else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
                    addBotMessageWithReplies("You can reach us through:<br><br>" +
                        "• Email: hello@nexatech.com<br>" +
                        "• Phone: (555) 123-4567<br>" +
                        "• Contact form on our website<br><br>" +
                        "Would you like me to direct you to our contact form?",
                        ["Yes, Contact Form", "Services", "Pricing"]);
                }
                else if (lowerMessage.includes('yes') && (lowerMessage.includes('contact') || lowerMessage.includes('form'))) {
                    addBotMessageWithReplies("Great! I'll redirect you to our contact form where you can share your project details with us.", 
                        ["Services", "Pricing", "Main Menu"]);
                    setTimeout(() => {
                        window.location.href = 'contact.html';
                    }, 1500);
                }
                else {
                    addBotMessageWithReplies("I'm not sure I understand. You can reach us via the contact form for detailed information. How else can I help?",
                        ["Services", "Pricing", "Contact"]);
                }
            }, 1000);
        }
    }
});