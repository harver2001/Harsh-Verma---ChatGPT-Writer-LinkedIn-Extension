import React, { useEffect, useState } from 'react';
import Modal from './components/Modal';
import 'tailwindcss/tailwind.css'; // Ensure TailwindCSS is imported

const App: React.FC = () => {
  const [clickedChat, setClickedChat] = useState<HTMLElement | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const injectLogo = () => {
      const chatSelector = '.msg-form__contenteditable';
      const chatElements = document.querySelectorAll<HTMLElement>(chatSelector);

      chatElements.forEach(chat => {
        if (!chat.querySelector('.custom-logo')) {
          const logoImg = document.createElement('img');
          logoImg.src = chrome.runtime.getURL('assets/your-logo.png'); // Ensure this path is correct
          logoImg.className = 'custom-logo';
          logoImg.style.width = '30px';
          logoImg.style.height = '30px';
          logoImg.style.position = 'absolute';
          logoImg.style.right = '10px';
          logoImg.style.bottom = '10px';
          logoImg.style.cursor = 'pointer';
          logoImg.style.display = 'none';
          logoImg.addEventListener('click', () => {
            console.log('Logo clicked');
            setClickedChat(chat);
            setShowModal(true);
          });
          chat.appendChild(logoImg);

          chat.addEventListener('focus', () => {
            logoImg.style.display = 'block';
          });

          chat.addEventListener('blur', () => {
            logoImg.style.display = 'none';
          });
        }
      });
    };

    const observer = new MutationObserver(() => {
      injectLogo();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    injectLogo();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    console.log('showModal:', showModal);
  }, [showModal]);

  useEffect(() => {
    console.log('clickedChat:', clickedChat);
  }, [clickedChat]);

  return (
    <div>
      {showModal && <Modal clickedChat={clickedChat} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default App;