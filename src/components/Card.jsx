function Card({ children, className = "" }) {
  return <section className={`cartao ${className}`}>{children}</section>;
}

export default Card;
