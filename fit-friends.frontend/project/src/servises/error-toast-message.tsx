function ErrorToastMessage(errors: string[]): JSX.Element {
  return (
    <p>
      {errors.map((error) => (<>{error}<br/></>))}
    </p>
  );
}

export const getErrorToastMessage = (errors: string[]) => ErrorToastMessage(errors);

