type LoadingProps = {
  message: string;
};

export default function Loading({ message }: LoadingProps) {
  return (
    <div className="flex justify-center items-center mt-[20%]">
      <p className="text-3xl text-gray-500">{message}</p>
    </div>
  );
}
