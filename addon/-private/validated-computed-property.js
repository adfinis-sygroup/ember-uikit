import { computed, get } from "@ember/object";
import { warn } from "@ember/debug";

export const validateValue = (value, name, options, mediaOptions) => {
  if (
    value &&
    !options.filter((v) => {
      let re = new RegExp(`^${v}(${mediaOptions.join("|")})?$`);

      return re.test(value);
    }).length
  ) {
    warn(
      `\`${name}\` must be one of ${options
        .map((v) => `'${v}'`)
        .join(", ")}. Passed was '${value}', which will therefore be ignored.`,
      {
        id: "ember-uikit.invalid-property",
      }
    );

    return null;
  }

  return value;
};

export const validatedComputedProperty = (
  key,
  name,
  optionsKey,
  mediaOptionsKey = "MEDIA_OPTIONS",
  sanitize = (val) => val || ""
) => {
  return computed(key, `${optionsKey}.[]`, `${mediaOptionsKey}.[]`, {
    get() {
      return this.get(key);
    },
    set(_, value) {
      let validated = sanitize(
        validateValue(
          value,
          name,
          get(this, optionsKey) ?? [],
          get(this, mediaOptionsKey) ?? []
        )
      );

      this.set(key, validated);

      return validated;
    },
  });
};

export const validatedArrayComputedProperty = (
  key,
  name,
  optionsKey,
  mediaOptionsKey = "MEDIA_OPTIONS",
  separator = " ",
  sanitize = (val) => val || ""
) => {
  return computed(key, `${optionsKey}.[]`, `${mediaOptionsKey}.[]`, {
    get() {
      return this.get(key);
    },
    set(_, value) {
      let validated =
        value &&
        value
          .split(separator)
          .map((v) =>
            sanitize(
              validateValue(
                v,
                name,
                get(this, optionsKey) ?? [],
                get(this, mediaOptionsKey) ?? []
              )
            )
          )
          .join(separator)
          .trim();

      this.set(key, validated);

      return validated;
    },
  });
};

export default validatedComputedProperty;
