import { useRouter } from "next/router";

export default function NavBarTitle() {
  const router = useRouter();
  return (
    <>
      {router.pathname == "/" ? (
        <div
          id="inspiring_div"
          className="mt-auto flex flex-col gap-2 text-start"
        >
          <p className="text-3xl md:text-4xl" style={{ fontWeight: "519" }}>
            Inspiring generations to co-exist
          </p>
          <div className="pl-10">
            <p className="md:text-xl">recreation, education, conservation</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
