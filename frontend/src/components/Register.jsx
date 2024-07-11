export default function Register() {
  return (
    <form className="col-12 col-md-4 mx-auto">
      <div className="mb-3">
        <label
          htmlFor="first-name"
          className="form-label"
        >
          First name
        </label>
        <input
          type="text"
          name="first-name"
          id="first-name"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="last-name"
          className="form-label"
        >
          Last name
        </label>
        <input
          type="text"
          name="last-name"
          id="last-name"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="username"
          className="form-label"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="email"
          className="form-label"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="password"
          className="form-label"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="repeat-password"
          className="form-label"
        >
          Repeat password
        </label>
        <input
          type="password"
          name="repeat-password"
          id="repeat-password"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <div className="form-check">
          <input
            type="radio"
            name="gender"
            id="female"
            className="form-check-input"
            value="female"
          />
          <label
            htmlFor="female"
            className="form-check-label"
          >
            Female
          </label>
        </div>

        <div className="form-check">
          <input
            type="radio"
            name="gender"
            id="male"
            className="form-check-input"
            value="male"
          />
          <label
            htmlFor="male"
            className="form-check-label"
          >
            Male
          </label>
        </div>

        <div className="form-check">
          <input
            type="radio"
            name="gender"
            id="other"
            className="form-check-input"
            value="other"
          />
          <label
            htmlFor="other"
            className="form-check-label"
          >
            Other
          </label>
        </div>
      </div>

      <div className="mb-3">
        <label
          htmlFor="country"
          className="form-label"
        >
          Country you reside in
        </label>
        <select
          className="form-select"
          id="country"
        >
          <option defaultValue>Choose your country</option>
          <option value="Lithuania">Lithuania</option>
          <option value="Latvia">Latvia</option>
          <option value="Estonia">Estonia</option>
        </select>
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          name="privacy-policy"
          id="privacy-policy"
          className="form-check-input"
          value="isPrivacyPolicyAccepted"
        />
        <label
          htmlFor="privacy-policy"
          className="form-check-label"
        >
          I accept Privacy Policy
        </label>
      </div>

      <button className="btn btn-primary">Submit</button>
    </form>
  );
}
