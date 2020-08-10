export const backgroundMove = () => {
  if (typeof window !== 'undefined') {
    const bg: HTMLDivElement = document.querySelector('.background-image');
    const windowWidth = window.innerWidth / 5;
    const windowHeight = window.innerHeight / 5;
  
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / windowWidth;
      const mouseY = e.clientY / windowHeight;
      
      bg.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
    });
  }
}

