import Nav from './Nav';

const Header = () => {
  return (
    <div>
      <div className="bar">
        <a>Sick Fits</a>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>Cart</div>
    </div>
  );
};

export default Header;
