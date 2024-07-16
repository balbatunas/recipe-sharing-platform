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
          <div className="text-danger">Minimum symbols: 2</div>
        )}
        {errors.firstName?.type === "maxLength" && (
          <div className="text-danger">Maximum symbols: 135</div>
        )}
        {errors.firstName?.type === "pattern" && (
          <div className="text-danger">
            You can only enter letters. First letter must be capital. At least 2
            characters long
          </div>
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
            pattern: /^[A-Z][a-zA-Z]*$/,
          })}
        />
        {errors.lastName?.type === "required" && (
          <div className="text-danger">This field is required</div>
        )}
        {errors.lastName?.type === "minLength" && (
          <div className="text-danger">Minimum symbols: 2</div>
        )}
        {errors.lastName?.type === "maxLength" && (
          <div className="text-danger">Maximum symbols: 100</div>
        )}
        {errors.lastName?.type === "pattern" && (
          <div className="text-danger">
            You can only enter letters. First letter must be capital. At least 2
            characters long
          </div>
        )}
      </div>

      <div className="mb-3">
        <label
          htmlFor="displayName"
          className="form-label"
        >
          Display Name
        </label>
        <input
          type="text"
          id="displayName"
          className="form-control"
          autoComplete="displayName"
          {...register("displayName", {
            required: true,
            maxLength: 255,
            minLength: 1,
            validate: {
              pattern1: (value) =>
                /^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)*$/i.test(value) ||
                "You can only enter letters or numbers, no more than one space between words",
              pattern2: (value) =>
                !/(?:fuck|shit|damn|bitch|crap|asshole|bastard|dick|piss|cunt)/i.test(
                  value
                ) || "Display name can't contain inappropriate language",
            },
          })}
        />
        {errors.displayName?.type === "required" && (
          <div className="text-danger">This field is required</div>
        )}
        {errors.displayName?.type === "minLength" && (
          <div className="text-danger">Minimum symbols: 1</div>
        )}
        {errors.displayName?.type === "maxLength" && (
          <div className="text-danger">Maximum symbols: 255</div>
        )}
        {errors.displayName?.type === "pattern1" && (
          <div className="text-danger">{errors.displayName.message}</div>
        )}
        {errors.displayName?.type === "pattern2" && (
          <div className="text-danger">{errors.displayName.message}</div>
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
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, // Pattern to allow only lowercase letters and valid email characters
          })}
        />
        {errors.email?.type === "required" && (
          <div className="text-danger">This field is required</div>
        )}
        {errors.email?.type === "minLength" && (
          <div className="text-danger">Minimum symbols: 5</div>
        )}
        {errors.email?.type === "maxLength" && (
          <div className="text-danger">Maximum symbols: 200</div>
        )}
        {errors.email?.type === "pattern" && (
          <div className="text-danger">
            You can only enter lowercase letters
          </div>
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
          <div className="text-danger">Minimum symbols: 8</div>
        )}
        {errors.password?.type === "maxLength" && (
          <div className="text-danger">Maximum symbols: 255</div>
        )}
        {errors.password?.type === "pattern" && (
          <div className="text-danger">
            Must contain at least one uppercase, lowercase letter, number, and
            any of these special symbols: !@#$%^&*
          </div>
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
