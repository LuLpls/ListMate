import styled from 'styled-components';

export const NavbarContainer = styled.div`
  background-color: #333;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavbarLogo = styled.div`
  color: #fff;
  font-size: 1.5rem;
`;

export const MenuIcon = styled.div`
  display: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const NavMenu = styled.ul`
  list-style: none;
  display: flex;

  li {
    padding: 0 15px;
  }

  a {
    text-decoration: none;
    color: #fff;
  }
`;

// Media query pro menší obrazovky
export const MobileNavMenu = styled(NavMenu)`
  flex-direction: column;
  width: 100%;
  position: absolute;
  top: 80px;
  left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  transition: left 0.3s ease-in-out;
  background-color: #333;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};

  li {
    padding: 15px 0;
    text-align: center;
    width: 100%;
  }
`;

// Media query pro větší obrazovky (sidebar)
export const DesktopNavMenu = styled(NavMenu)`
  flex-direction: column;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #333;
  padding-top: 80px;
  transition: left 0.3s ease-in-out;

  li {
    padding: 15px 20px;
    text-align: left;
    width: 100%;
  }
`;

