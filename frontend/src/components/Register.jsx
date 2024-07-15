import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form
      className="col-12 col-md-4 mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-3">
        <label
          htmlFor="first-name"
          className="form-label"
        >
          First name
        </label>
        <input
          type="text"
          id="first-name"
          className="form-control"
          autoComplete="given-name"
          {...register("firstName", {
            required: true,
            maxLength: 135,
            minLength: 2,
            pattern: /^[A-Z][a-zA-Z- ]+$/,
          })}
        />
        {errors.firstName?.type == "required" && (
          <div className="text-danger">This field is required</div>
        )}
        {errors.firstName?.type === "minLength" && (
          <p role="alert">Minimum symbols: 2</p>
        )}
        {errors.firstName?.type === "maxLength" && (
          <p role="alert">Maximum symbols: 135</p>
        )}
        {errors.firstName?.type === "pattern" && (
          <p role="alert">Only letters, First letter must be uppercase</p>
        )}
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
          id="last-name"
          className="form-control"
          autoComplete="family-name"
          {...register("lastName", {
            required: true,
            maxLength: 100,
            minLength: 2,
            pattern: /^[A-Z][a-zA-Z- ]*$/,
            // pattern: /^[A-Z][a-zA-Z- ]+$/i,
          })}
        />
        {errors.lastName?.type === "required" && (
          <div className="text-danger">This field is required</div>
        )}
        {errors.lastName?.type === "minLength" && (
          <p role="alert">Minimum symbols: 2</p>
        )}
        {errors.lastName?.type === "maxLength" && (
          <p role="alert">Maximum symbols: 100</p>
        )}
        {errors.lastName?.type === "pattern" && (
          <p role="alert">Only letters, First letter must be uppercase</p>
        )}
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
          id="username"
          className="form-control"
          autoComplete="username"
          {...register("username", {
            required: true,
            maxLength: 255,
            minLength: 1,
            pattern: /^[a-zA-z0-9][a-zA-Z0-9 ]*$/i,
          })}
        />
        {errors.username?.type === "required" && (
          <div className="text-danger">This field is required</div>
        )}
        {errors.username?.type === "minLength" && (
          <p role="alert">Minimum symbols: 1</p>
        )}
        {errors.username?.type === "maxLength" && (
          <p role="alert">Maximum symbols: 255</p>
        )}
        {errors.username?.type === "pattern" && (
          <p role="alert">
            Must contain only letters, numbers and spaces, Cannot contain more
            that one space after another one, First character must be letter or
            number
          </p>
        )}
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
          id="email"
          className="form-control"
          autoComplete="email"
          {...register("email", {
            required: true,
            maxLength: 200,
            minLength: 5,
          })}
        />
        {errors.email?.type === "required" && (
          <div className="text-danger">This field is required</div>
        )}
        {errors.email?.type === "minLength" && (
          <p role="alert">Minimum symbols: 5</p>
        )}
        {errors.email?.type === "maxLength" && (
          <p role="alert">Maximum symbols: 200</p>
        )}
      </div>

      <div className="mb-3">
        <label
          htmlFor="password"
          className="form-label"
          autoComplete="new-password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          {...register("password", {
            required: true,
            maxLength: 255,
            minLength: 8,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{8,}$/,
          })}
        />
        {errors.password?.type === "required" && (
          <div className="text-danger">This field is required</div>
        )}
        {errors.password?.type === "minLength" && (
          <p role="alert">Minimum symbols: 8</p>
        )}
        {errors.password?.type === "maxLength" && (
          <p role="alert">Maximum symbols: 255</p>
        )}
        {errors.password?.type === "pattern" && (
          <p role="alert">
            Must contain at least one uppercase, lowercase letter, number, and
            any of these special symbols: !@#$%^&*
          </p>
        )}
      </div>

      <div className="mb-3">
        <label
          htmlFor="repeat-password"
          className="form-label"
          autoComplete="new-password"
        >
          Repeat password
        </label>
        <input
          type="password"
          id="repeat-password"
          className="form-control"
          {...register("repeatPassword", { required: true })}
        />
        {errors.repeatPassword?.type == "required" && (
          <div className="text-danger">This field is required</div>
        )}
      </div>

      <fieldset className="mb-3">
        <legend>Pick your gender</legend>
        <div className="form-check">
          <input
            type="radio"
            id="female"
            className="form-check-input"
            value="Female"
            {...register("gender", {
              required: true,
              maxLength: 6,
              minLength: 4,
            })}
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
            id="male"
            className="form-check-input"
            value="Male"
            {...register("gender")}
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
            id="other"
            className="form-check-input"
            value="Other"
            {...register("gender")}
          />
          <label
            htmlFor="other"
            className="form-check-label"
          >
            Other
          </label>
        </div>
      </fieldset>

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
          autoComplete="country"
          {...register("country", { required: true })}
        >
          <option value="">Choose your country</option>
          <option value="Lithuania">Lithuania</option>
          <option value="Latvia">Latvia</option>
          <option value="Estonia">Estonia</option>
        </select>
        {errors.country?.type === "required" && (
          <div className="text-danger">This field is required</div>
        )}
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          id="privacy-policy"
          className="form-check-input"
          value="isPrivacyPolicyAccepted"
          {...register("isPrivacyPolicyAccepted", { required: true })}
        />
        <label
          htmlFor="privacy-policy"
          className="form-check-label"
        >
          I accept Privacy Policy
        </label>
        {errors.isPrivacyPolicyAccepted?.type === "required" && (
          <div className="text-danger">
            You must check this in order to continue
          </div>
        )}
      </div>

      <button className="btn btn-primary">Submit</button>
    </form>
  );
}
