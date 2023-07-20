export function age(birthdate) {
  const today = new Date();
  const age =
    today.getFullYear() -
    birthdate.getFullYear() -
    (today.getMonth() < birthdate.getMonth() ||
      (today.getMonth() === birthdate.getMonth() &&
        today.getDate() < birthdate.getDate()));
  return age;
}

export function getMyAvatar(path) {
  return (
    <img
      alt="test"
      src={path}
      style={{
        borderRadius: "80%",
        width: "50px",
      }}
    ></img>
  );
}

export function getMyName(fn, ln) {
  return (
    <div style={{ marginLeft: "20px" }}>
      {fn} {ln}
    </div>
  );
}
