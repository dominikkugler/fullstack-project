export default function Footer() {
  return (
    <footer className="bg-body-tertiary text-center py-3">
      <div className="container">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} My Application. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
