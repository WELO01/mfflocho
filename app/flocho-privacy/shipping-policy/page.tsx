export default function ShippingPolicy() {
  return (
    <>
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">
        Shipping and Return Policy
      </h2>

      {/* SHIPPING POLICY */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">
        Shipping Policy
      </h3>
      <p className="text-zinc-300 mb-4">
        FlochoLLC is committed to delivering your orders on time and in excellent
        condition. All orders are processed within the timelines specified during
        checkout. However, delays may occur due to circumstances beyond our control,
        including but not limited to:
      </p>

      <ul className="text-zinc-300 list-disc ml-6 space-y-2 mb-4">
        <li>Weather conditions or natural disasters.</li>
        <li>Shipping carrier delays or strikes.</li>
        <li>Supply chain disruptions or shortages.</li>
        <li>High order volumes during peak seasons.</li>
      </ul>

      <p className="text-zinc-300 mb-4">
        FlochoLLC is not responsible for delays caused by shipping carriers or other
        unforeseen circumstances. In the event of a significant delay, we will
        notify you promptly and work to resolve the issue.
      </p>

      <h4 className="text-xl font-semibold text-cyan-400 mt-6 mb-2">
        Shipping Fees
      </h4>
      <p className="text-zinc-300 mb-4">
        Shipping fees are non-refundable unless the return is due to an error by
        FlochoLLC or a verified defect. Customers are responsible for providing
        accurate shipping information. FlochoLLC is not liable for lost or delayed
        orders caused by incorrect shipping details provided by the customer.
      </p>

      {/* CUSTOMIZED PRODUCTS */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">
        Customized Products
      </h3>
      <p className="text-zinc-300 mb-4">
        Customized products are made specifically to meet the customer’s
        specifications. As such, they are non-refundable and non-returnable except
        in cases of verified manufacturing defects or errors made by FlochoLLC.
        To minimize errors:
      </p>

      <ul className="text-zinc-300 list-disc ml-6 space-y-2 mb-4">
        <li>
          Customers must review and confirm all details (e.g., size, color, design)
          before completing the purchase.
        </li>
        <li>
          FlochoLLC is not responsible for mistakes arising from incorrect customer
          specifications or submissions.
        </li>
      </ul>

      <p className="text-zinc-300 mb-4">
        FlochoLLC reserves the right to deny refund or return requests for customized
        products if the issue is not attributable to a manufacturing defect or
        company error.
      </p>

      {/* RETURN ELIGIBILITY */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">
        Return Eligibility
      </h3>
      <p className="text-zinc-300 mb-4">
        Returns are accepted under the following conditions:
      </p>

      <ul className="text-zinc-300 list-disc ml-6 space-y-2 mb-4">
        <li>
          The product must have a verified manufacturing defect or have been sent
          incorrectly due to an error by FlochoLLC.
        </li>
        <li>Return requests must be submitted within 7 days of receiving the product.</li>
        <li>
          The product must be unused, in its original condition, and include all
          original packaging.
        </li>
      </ul>

      <p className="text-zinc-300 mb-4">
        Returns that do not meet these conditions will not be accepted.
      </p>

      {/* RETURN PROCESS */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">
        Return Process
      </h3>
      <p className="text-zinc-300 mb-4">
        To initiate a return, follow these steps:
      </p>

      <ol className="text-zinc-300 list-decimal ml-6 space-y-2 mb-4">
        <li>
          Contact us at <span className="text-cyan-400">support@flocho.com</span>{" "}
          with your order number, a detailed description of the issue, and evidence
          of the defect (e.g., photos or videos).
        </li>
        <li>
          If the return is approved, we will provide instructions for sending the
          item back.
        </li>
        <li>
          Customers are responsible for return shipping costs unless the return is
          due to an error or defect caused by FlochoLLC.
        </li>
      </ol>

      {/* REFUND POLICY */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">
        Refund Policy
      </h3>
      <ul className="text-zinc-300 list-disc ml-6 space-y-2 mb-4">
        <li>
          Refunds will only be processed after the returned item is received and
          inspected by FlochoLLC.
        </li>
        <li>Refunds will be issued to the original payment method used.</li>
        <li>
          Shipping fees are non-refundable unless the return is due to a FlochoLLC
          error.
        </li>
        <li>
          Refunds typically take 5–10 business days to appear, depending on your
          bank or financial institution.
        </li>
      </ul>

      {/* FRAUD PREVENTION */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">
        Fraud Prevention and Abuse of Policies
      </h3>
      <ul className="text-zinc-300 list-disc ml-6 space-y-2 mb-4">
        <li>
          FlochoLLC reserves the right to investigate and deny return/refund
          requests that appear fraudulent, abusive, or made in bad faith.
        </li>
        <li>
          Customers engaging in fraudulent behavior may be restricted from future
          purchases and reported to authorities.
        </li>
        <li>
          Repeated abuse of policies may result in account termination and loss of
          access to services.
        </li>
      </ul>

      {/* LIMITATIONS OF LIABILITY */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">
        Limitations of Liability
      </h3>
      <ul className="text-zinc-300 list-disc ml-6 space-y-2 mb-4">
        <li>Delays, damages, or losses caused by third-party carriers.</li>
        <li>
          Customer errors, including incorrect order details or shipping information.
        </li>
        <li>
          Issues arising from events beyond our control, such as natural disasters,
          strikes, or supply chain disruptions.
        </li>
      </ul>

      <p className="text-zinc-300 mb-4">
        Our liability is limited to the value of the product purchased. By using our
        services, you agree to these terms and acknowledge that FlochoLLC operates in
        good faith to ensure customer satisfaction and compliance with applicable laws.
      </p>

      {/* POLICY UPDATES */}
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">
        Policy Updates
      </h3>
      <p className="text-zinc-300 mb-8">
        FlochoLLC reserves the right to update or modify this policy at any time. Any
        changes will be reflected on this page. Continued use of our services
        constitutes acceptance of the updated policies.
      </p>
    </>
  );
}
