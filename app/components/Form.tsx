import React from "react";

interface FormField {
  name: string;
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
}

interface SigninFormProps {
  fields: FormField[];
}

const Form: React.FC<SigninFormProps> = ({ fields }) => {
  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          {fields.map((field, index) => (
            <div key={index} className="mt-10">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {field.label}
              </label>
              <div>
                <div className="flex rounded-md outline-1 outline shadow-sm outline-blue-800 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    autoComplete={field.autoComplete}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder={field.placeholder}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Form;
