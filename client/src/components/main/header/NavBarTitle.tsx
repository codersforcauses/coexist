import { useRouter } from "next/router";

export default function NavBarTitle() {
  const router = useRouter();
  return (
    <>
      {router.pathname == "/" ? (
        <div
          id="inspiring_div"
          className="mt-auto h-[100px] text-center sm:text-start"
        >
          <div className="text-4xl" style={{ fontWeight: "519" }}>
            Inspiring generations to co-exist
          </div>
          <div className="text-xl">recreation, education, conservation</div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
