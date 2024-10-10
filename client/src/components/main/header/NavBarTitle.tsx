import { useRouter } from "next/router";

export default function NavBarTitle() {
  const router = useRouter();
  return (
    <>
      {router.pathname == "/" ? (
        <div
          id="inspiring_div"
          className="mt-auto flex flex-col gap-6 text-start"
        >
          <p
            className="text-3xl md:text-4xl lg:text-5xl"
            style={{ fontWeight: "519" }}
          >
            Inspiring generations to co-exist
          </p>
          <p
            className="text-lg md:text-xl lg:text-2xl"
            style={{ fontWeight: "459" }}
          >
            recreation, education, conservation
          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
