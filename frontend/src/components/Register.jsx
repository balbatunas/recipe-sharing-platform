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
          name="first-name"
          id="first-name"
          className="form-control"
          autoComplete="given-name"
          {...register("firstName", { required: true })}
        />
        {errors.firstName?.type == "required" && (
          <div className="text-danger">This field is required</div>
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
          name="last-name"
          id="last-name"
          className="form-control"
          autoComplete="family-name"
          {...register("lastName", { required: true })}
        />
        {errors.lastName?.type === "required" && (
          <div className="text-danger">This field is required</div>
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
          name="username"
          id="username"
          className="form-control"
          autoComplete="username"
          {...register("username", { required: true })}
        />
        {errors.username?.type === "required" && (
          <div className="text-danger">This field is required</div>
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
          name="email"
          id="email"
          className="form-control"
          autoComplete="email"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <div className="text-danger">This field is required</div>
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
          name="password"
          id="password"
          className="form-control"
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && (
          <div className="text-danger">This field is required</div>
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
          name="repeat-password"
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
            name="gender"
            id="female"
            className="form-check-input"
            value="Female"
            {...register("gender")}
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
            name="gender"
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
          name="privacy-policy"
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
