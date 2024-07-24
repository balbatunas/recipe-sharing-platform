import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data.roles = [
      {
        id: 1,
      },
    ];
    console.log(data);
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        navigate("/", {
          state: {
            message: "You have registered successfully. You can now log in",
          },
        });
        console.log("Registration successful:", result);
      } else {
        const errorData = await response.json();
        if (response.status === 400) {
          // Handling field-specific errors
          if (errorData.displayName) {
            setError("displayName", {
              type: "server",
              message: errorData.displayName,
            });
          }
          if (errorData.email) {
            setError("email", {
              type: "server",
              message: errorData.email,
            });
          }
          if (errorData.dateOfBirth) {
            setError("dateOfBirth", {
              type: "server",
              message: errorData.dateOfBirth,
            });
          }
          if (errorData.id) {
            setError("roles.0.id", {
              type: "server",
              message: errorData.id,
            });
          }
          console.error("Server validation error:", errorData);
        } else {
          console.error("Unexpected response:", response.status);
        }
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const password = watch("password");

  return (
    <form
      className="col-12 col-md-4 mx-auto"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
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
            pattern: /^[A-Z][a-zA-Z]+$/,
          })}
        />
        {errors.firstName?.type == "required" && (
          <div className="text-danger">This field is required</div>
        )}
        {errors.firstName?.type === "maxLength" && (
          <div className="text-danger">Maximum length is 135 characters</div>
        )}
        {errors.firstName?.type === "pattern" && (
          <div className="text-danger">
            You can only enter English letters. First letter must be capital. At
            least 2 characters long.
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

            pattern: /^[A-Z][a-zA-Z]+$/,
          })}
        />
        {errors.lastName?.type === "required" && (
          <div className="text-danger">This field is required</div>
        )}
        {errors.lastName?.type === "maxLength" && (
          <div className="text-danger">Maximum length is 100 characters</div>
        )}
        {errors.lastName?.type === "pattern" && (
          <div className="text-danger">
            You can only enter English letters. First letter must be capital. At
            least 2 characters long.
          </div>
        )}
      </div>

      <div className="mb-3">
        <label
          htmlFor="displayName"
          className="form-label"
        >
          Display name
        </label>
        <input
          type="text"
          id="displayName"
          className="form-control"
          autoComplete="username"
          {...register("displayName", {
            required: true,
            maxLength: 255,
            validate: {
              pattern1: (value) =>
                /^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)*$/i.test(value) ||
                "You can only enter English letters or numbers. At least 1 character long. Cannot begin or end with a space. No more than one space between words",
              pattern2: (value) =>
                !/(?:fuck|shit|damn|bitch|crap|asshole|bastard|dick|piss|cunt)/i.test(
                  value
                ) || "Display name contains inappropriate language",
            },
          })}
        />
        {errors.displayName?.type === "required" && (
          <div className="text-danger">This field is required</div>
        )}
        {errors.displayName?.type === "maxLength" && (
          <div className="text-danger">Maximum length is 255 characters</div>
        )}
        {errors.displayName?.type === "pattern1" && (
          <div className="text-danger">{errors.displayName.message}</div>
        )}
        {errors.displayName?.type === "pattern2" && (
          <div className="text-danger">{errors.displayName.message}</div>
        )}
        {errors.displayName?.type === "server" && (
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
            pattern: /^[a-z0-9._-]+@[a-z0-9]+\.[a-z]+$/, // Pattern to allow only lowercase letters and valid email characters
          })}
        />
        {errors.email?.type === "required" && (
          <div className="text-danger">This field is required</div>
        )}
        {errors.email?.type === "maxLength" && (
          <div className="text-danger">Maximum length 200 characters</div>
        )}
        {errors.email?.type === "pattern" && (
          <div className="text-danger">
            May only contain English letters, all lowercase. Can contain
            numbers, and these symbols ._-
          </div>
        )}
        {errors.email && (
          <div className="text-danger">{errors.email.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label
          htmlFor="password"
          className="form-label"
        >
          Password
        </label>
        <div className="input-group">
          <input
            autoComplete="new-password"
            type={showPassword ? "text" : "password"}
            id="password"
            className="form-control"
            {...register("password", {
              required: true,
              maxLength: 255,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*"]).+$/,
            })}
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password?.type === "required" && (
          <div className="text-danger">This field is required</div>
        )}
        {errors.password?.type === "maxLength" && (
          <div className="text-danger">maximum length 255 characters</div>
        )}
        {errors.password?.type === "pattern" && (
          <div className="text-danger">
            Must contain at least one uppercase letter, one lowercase letter,
            one number, and any one of these special symbols: !@#$%^&*".
          </div>
        )}
      </div>

      <div className="mb-3">
        <label
          htmlFor="repeat-password"
          className="form-label"
        >
          Repeat password
        </label>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            id="repeat-password"
            className="form-control"
            autoComplete="new-password"
            {...register("passwordConfirm", {
              required: true,
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.passwordConfirm?.type === "required" && (
          <div className="text-danger">This field is required</div>
        )}
        {errors.passwordConfirm?.type === "validate" && (
          <div className="text-danger">{errors.passwordConfirm.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label
          htmlFor="dateOfBirth"
          className="form-label"
        >
          Date of birth
        </label>
        <input
          type="date"
          id="dateOfBirth"
          className="form-control"
          {...register("dateOfBirth", {
            required: true,
          })}
        />
        {errors.dateOfBirth?.type === "required" && (
          <div className="text-danger">
            This field is required, and must be valid
          </div>
        )}
        {errors.dateOfBirth && (
          <div className="text-danger">{errors.dateOfBirth.message}</div>
        )}
      </div>

      <fieldset className="mb-3">
        <label
          htmlFor="female"
          className="form-label"
        >
          Gender (optional)
        </label>
        <div className="form-check">
          <input
            type="radio"
            id="female"
            className="form-check-input"
            value="Female"
            {...register("gender", {
              required: false,
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
          Country
        </label>
        <select
          className="form-select"
          id="country"
          autoComplete="country"
          {...register("country", { required: true })}
        >
          <option value="Lithuania">Lithuania</option>
          <option value="Afghanistan">Afghanistan</option>
          <option value="Albania">Albania</option>
          <option value="Algeria">Algeria</option>
          <option value="Andorra">Andorra</option>
          <option value="Angola">Angola</option>
          <option value="Antigua and Barbuda">Antigua and Barbuda</option>
          <option value="Argentina">Argentina</option>
          <option value="Armenia">Armenia</option>
          <option value="Australia">Australia</option>
          <option value="Austria">Austria</option>
          <option value="Azerbaijan">Azerbaijan</option>
          <option value="Bahamas">Bahamas</option>
          <option value="Bahrain">Bahrain</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="Barbados">Barbados</option>
          <option value="Belarus">Belarus</option>
          <option value="Belgium">Belgium</option>
          <option value="Belize">Belize</option>
          <option value="Benin">Benin</option>
          <option value="Bhutan">Bhutan</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
          <option value="Botswana">Botswana</option>
          <option value="Brazil">Brazil</option>
          <option value="Brunei">Brunei</option>
          <option value="Bulgaria">Bulgaria</option>
          <option value="Burkina Faso">Burkina Faso</option>
          <option value="Burundi">Burundi</option>
          <option value="Cabo Verde">Cabo Verde</option>
          <option value="Cambodia">Cambodia</option>
          <option value="Cameroon">Cameroon</option>
          <option value="Canada">Canada</option>
          <option value="Central African Republic">
            Central African Republic
          </option>
          <option value="Chad">Chad</option>
          <option value="Chile">Chile</option>
          <option value="China">China</option>
          <option value="Colombia">Colombia</option>
          <option value="Comoros">Comoros</option>
          <option value="Congo (Congo-Brazzaville)">
            Congo (Congo-Brazzaville)
          </option>
          <option value="Costa Rica">Costa Rica</option>
          <option value="Croatia">Croatia</option>
          <option value="Cuba">Cuba</option>
          <option value="Cyprus">Cyprus</option>
          <option value="Czechia (Czech Republic)">
            Czechia (Czech Republic)
          </option>
          <option value="Democratic Republic of the Congo">
            Democratic Republic of the Congo
          </option>
          <option value="Denmark">Denmark</option>
          <option value="Djibouti">Djibouti</option>
          <option value="Dominica">Dominica</option>
          <option value="Dominican Republic">Dominican Republic</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Egypt">Egypt</option>
          <option value="El Salvador">El Salvador</option>
          <option value="Equatorial Guinea">Equatorial Guinea</option>
          <option value="Eritrea">Eritrea</option>
          <option value="Estonia">Estonia</option>
          <option value="Ethiopia">Ethiopia</option>
          <option value="Fiji">Fiji</option>
          <option value="Finland">Finland</option>
          <option value="France">France</option>
          <option value="Gabon">Gabon</option>
          <option value="Gambia">Gambia</option>
          <option value="Georgia">Georgia</option>
          <option value="Germany">Germany</option>
          <option value="Ghana">Ghana</option>
          <option value="Greece">Greece</option>
          <option value="Grenada">Grenada</option>
          <option value="Guatemala">Guatemala</option>
          <option value="Guinea">Guinea</option>
          <option value="Guinea-Bissau">Guinea-Bissau</option>
          <option value="Guyana">Guyana</option>
          <option value="Haiti">Haiti</option>
          <option value="Honduras">Honduras</option>
          <option value="Hungary">Hungary</option>
          <option value="Iceland">Iceland</option>
          <option value="India">India</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Iran">Iran</option>
          <option value="Iraq">Iraq</option>
          <option value="Ireland">Ireland</option>
          <option value="Israel">Israel</option>
          <option value="Italy">Italy</option>
          <option value="Jamaica">Jamaica</option>
          <option value="Japan">Japan</option>
          <option value="Jordan">Jordan</option>
          <option value="Kazakhstan">Kazakhstan</option>
          <option value="Kenya">Kenya</option>
          <option value="Kiribati">Kiribati</option>
          <option value="Kuwait">Kuwait</option>
          <option value="Kyrgyzstan">Kyrgyzstan</option>
          <option value="Laos">Laos</option>
          <option value="Latvia">Latvia</option>
          <option value="Lebanon">Lebanon</option>
          <option value="Lesotho">Lesotho</option>
          <option value="Liberia">Liberia</option>
          <option value="Libya">Libya</option>
          <option value="Liechtenstein">Liechtenstein</option>

          <option value="Luxembourg">Luxembourg</option>
          <option value="Madagascar">Madagascar</option>
          <option value="Malawi">Malawi</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Maldives">Maldives</option>
          <option value="Mali">Mali</option>
          <option value="Malta">Malta</option>
          <option value="Marshall Islands">Marshall Islands</option>
          <option value="Mauritania">Mauritania</option>
          <option value="Mauritius">Mauritius</option>
          <option value="Mexico">Mexico</option>
          <option value="Micronesia">Micronesia</option>
          <option value="Moldova">Moldova</option>
          <option value="Monaco">Monaco</option>
          <option value="Mongolia">Mongolia</option>
          <option value="Montenegro">Montenegro</option>
          <option value="Morocco">Morocco</option>
          <option value="Mozambique">Mozambique</option>
          <option value="Myanmar (formerly Burma)">
            Myanmar (formerly Burma)
          </option>
          <option value="Namibia">Namibia</option>
          <option value="Nauru">Nauru</option>
          <option value="Nepal">Nepal</option>
          <option value="Netherlands">Netherlands</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Nicaragua">Nicaragua</option>
          <option value="Niger">Niger</option>
          <option value="Nigeria">Nigeria</option>
          <option value="North Korea">North Korea</option>
          <option value="North Macedonia">North Macedonia</option>
          <option value="Norway">Norway</option>
          <option value="Oman">Oman</option>
          <option value="Pakistan">Pakistan</option>
          <option value="Palau">Palau</option>
          <option value="Palestine State">Palestine State</option>
          <option value="Panama">Panama</option>
          <option value="Papua New Guinea">Papua New Guinea</option>
          <option value="Paraguay">Paraguay</option>
          <option value="Peru">Peru</option>
          <option value="Philippines">Philippines</option>
          <option value="Poland">Poland</option>
          <option value="Portugal">Portugal</option>
          <option value="Qatar">Qatar</option>
          <option value="Romania">Romania</option>
          <option value="Russia">Russia</option>
          <option value="Rwanda">Rwanda</option>
          <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
          <option value="Saint Lucia">Saint Lucia</option>
          <option value="Saint Vincent and the Grenadines">
            Saint Vincent and the Grenadines
          </option>
          <option value="Samoa">Samoa</option>
          <option value="San Marino">San Marino</option>
          <option value="Sao Tome and Principe">Sao Tome and Principe</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="Senegal">Senegal</option>
          <option value="Serbia">Serbia</option>
          <option value="Seychelles">Seychelles</option>
          <option value="Sierra Leone">Sierra Leone</option>
          <option value="Singapore">Singapore</option>
          <option value="Slovakia">Slovakia</option>
          <option value="Slovenia">Slovenia</option>
          <option value="Solomon Islands">Solomon Islands</option>
          <option value="Somalia">Somalia</option>
          <option value="South Africa">South Africa</option>
          <option value="South Korea">South Korea</option>
          <option value="South Sudan">South Sudan</option>
          <option value="Spain">Spain</option>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="Sudan">Sudan</option>
          <option value="Suriname">Suriname</option>
          <option value="Sweden">Sweden</option>
          <option value="Switzerland">Switzerland</option>
          <option value="Syria">Syria</option>
          <option value="Tajikistan">Tajikistan</option>
          <option value="Tanzania">Tanzania</option>
          <option value="Thailand">Thailand</option>
          <option value="Timor-Leste">Timor-Leste</option>
          <option value="Togo">Togo</option>
          <option value="Tonga">Tonga</option>
          <option value="Trinidad and Tobago">Trinidad and Tobago</option>
          <option value="Tunisia">Tunisia</option>
          <option value="Turkey">Turkey</option>
          <option value="Turkmenistan">Turkmenistan</option>
          <option value="Tuvalu">Tuvalu</option>
          <option value="Uganda">Uganda</option>
          <option value="Ukraine">Ukraine</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States of America">
            United States of America
          </option>
          <option value="Uruguay">Uruguay</option>
          <option value="Uzbekistan">Uzbekistan</option>
          <option value="Vanuatu">Vanuatu</option>
          <option value="Vatican">Vatican</option>
          <option value="Venezuela">Venezuela</option>
          <option value="Vietnam">Vietnam</option>
          <option value="Yemen">Yemen</option>
          <option value="Zambia">Zambia</option>
          <option value="Zimbabwe">Zimbabwe</option>
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
