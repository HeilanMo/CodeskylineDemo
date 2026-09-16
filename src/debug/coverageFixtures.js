export function classifyCustomer(customer) {
  if (customer.segment === "business") {
    return {
      segment: "business",
      discount: 0.2,
      label: "Business account",
    };
  }

  if (customer.segment === "trial") {
    return {
      segment: "trial",
      discount: 0.05,
      label: "Trial account",
    };
  }

  return {
    segment: "standard",
    discount: 0,
    label: "Standard account",
  };
}

export function createAlert(level) {
  if (level === "critical") {
    return {
      level,
      channel: "pager",
      message: "Immediate attention required",
    };
  }

  return {
    level,
    channel: "log",
    message: "Recorded for later review",
  };
}
