---
title: "Why Your Package Takes a Detour: Rethinking How Postal Networks Move Parcels Across Regions"
description: "How the Two-Region Multi-Depot Pickup and Delivery Problem (2R-MDPDP) models cross-regional logistics, and three extensions that make it more sustainable, flexible, and realistic for networks like DB Schenker and Vietnam Post."
pubDate: 2026-09-14
tags: ["logistics", "network design", "routing", "optimization"]
image: "/images/DB.jpg"
draft: false
---

## Introduction

Every time a parcel crosses a regional or national border, something interesting happens behind the scenes. It gets picked up by one truck, dropped at a depot, loaded onto a much bigger truck, driven for hours (sometimes overnight), unloaded at another depot, and finally handed off to a local vehicle for the last stretch to your door. Multiply that by thousands of parcels a day, across dozens of depots, and you start to see why logistics companies invest so heavily in operations research.

This is the world of the Multi-Depot Pickup and Delivery Problem (MDPDP), a longstanding challenge in Operations Research that models how multiple depots coordinate to fulfill transportation requests. My co-author Han Lam Tat and I dug into a specific and increasingly relevant variant of this problem: the Two-Region Multi-Depot Pickup and Delivery Problem (2R-MDPDP). Along the way, we mapped the model onto two real-world networks, DB Schenker in the Netherlands and Vietnam Post, and proposed extensions to make it more practically useful.

This post walks through what the problem is, why it matters, how it's mathematically structured, and what we think is missing from the classic formulation.

## The Problem With "One Big Region"

Most classical routing models treat the service area as one homogeneous zone. A fleet of vehicles departs from a depot, visits customers, and returns, all within the same operational bubble. That assumption works fine for a single city or a compact delivery zone, but it breaks down quickly in real logistics networks, where shipments routinely cross into entirely different operational territories.

When a pickup and its delivery sit in different regions, a carrier can't just send one vehicle to do the whole job. They need to:

- Assign region-restricted vehicles that are only licensed or suited to operate locally
- Choose exchange points (depots) where cargo gets transferred between vehicle types
- Coordinate timing so nothing sits idle waiting for a connection

Ignore this complexity, and you get a model that looks elegant on paper but doesn't reflect how parcels actually move. That's the gap the 2R-MDPDP is designed to close.

## What Is the 2R-MDPDP?

The 2R-MDPDP splits the service area into two distinct regions, each with its own depots and its own fleet of short-haul, light-duty trucks (LDTs) that never cross regional boundaries. A separate fleet of heavy-duty vehicles (HDVs) handles the long-haul leg between regions.

This creates two categories of requests:

- **Intra-region requests**, pickup and delivery both happen inside the same region, handled entirely by a single LDT.
- **Inter-region requests**, pickup and delivery are in different regions, requiring a three-leg journey:
  1. Local pickup by an origin-region LDT
  2. Consolidation and long-haul transfer via HDV to the destination region
  3. Final local delivery by a destination-region LDT

Because the long-haul leg introduces real transit time, the model treats an inter-region shipment as being in a "non-ready" state while it's in transit, it simply can't be delivered until it physically arrives and is handed off at the destination depot. The planning horizon spans multiple days to capture this realistically, and the objective is to minimize total transportation cost, distance traveled plus the fixed cost of deploying vehicles, while respecting capacity limits and strict pickup-before-delivery ordering.

Under the hood, this is formalized as a Mixed-Integer Linear Programming (MILP) model with decision variables tracking vehicle routes, cargo transfers between depots, vehicle loads over time, and service timing at every node. It's a genuinely hard combinatorial optimization problem, the kind where exact solvers hit a wall well before you reach real-world scale.

## Why Exact Methods Struggle, and Why ALNS Wins

A natural instinct in Operations Research is to reach for exact optimization, methods like Branch-and-Cut-and-Price (BCP), which combine branch-and-bound with column generation to guarantee provably optimal solutions. These techniques are powerful, and recent work has pushed them further with sophisticated tricks like bucket graph-based labeling.

But there's a catch. Once you add the temporal synchronization required by inter-regional coordination, cross-tier vehicle schedules, depot consistency, multi-day lead times, the number of possible route combinations explodes exponentially. Exact methods simply can't keep pace with anything beyond small, controlled instances.

This is where Adaptive Large Neighborhood Search (ALNS) comes in. ALNS uses a "ruin-and-recreate" approach: it deliberately tears apart part of the current solution using destroy operators, then rebuilds it using repair operators, guided by a simulated annealing acceptance criterion that allows occasional detours into worse solutions to avoid getting stuck. Over many iterations, the algorithm learns which combinations of destroy-and-repair operators work best for the current network state.

For a multi-tiered problem like the 2R-MDPDP, ALNS is decomposed into three coordinated layers: scheduling inter-regional transfers, assigning intra-regional requests to depots, and sequencing local delivery routes. It's not mathematically guaranteed to be optimal, but it's scalable, and scalability is exactly what large logistics networks need.

## Seeing the Model in the Real World

Theory is only useful if it maps onto practice, so we looked at two real logistics networks through the lens of the 2R-MDPDP.

### DB Schenker: Fixed Boundaries, Flexible Reality

DB Schenker manages land freight across the Netherlands through three major depots, Tilburg, Ede, and Oldenzaal, each with a fixed "service area" determining which depot serves which customers. In practice, though, planners frequently override these boundaries to fill trucks faster or hit delivery deadlines.

The structural parallel to the 2R-MDPDP is strong: small vehicles handle local short-haul work, while larger trucks (or scheduled lines) move heavy loads between hubs, and packages often wait at a depot for the next available long-distance transport. The key lesson from this case is that local routing and hub-to-hub scheduling can't be optimized in isolation, a package might need direct LDT delivery, even far outside its usual territory, simply because the last HDV of the day has already departed. Coordinated, simultaneous planning of both tiers is what actually saves money.

### Vietnam Post: From Static Routes to Adaptive Networks

Vietnam Post's five-level national network, spanning 63 provincial hubs and over 700 district hubs, maps almost perfectly onto the 2R-MDPDP's district-to-provincial transport layer. But the current operation relies heavily on static, rule-based routing: district vans follow the same predefined paths every day, regardless of actual parcel volume, and planners struggle to synchronize dozens of local vans with scheduled linehaul departures.

Applying the 2R-MDPDP framework here means moving from fixed daily routes to a short-term planning horizon that adapts routes to that day's actual demand, while still guaranteeing that vans arrive at the provincial hub in time to catch their linehaul connection. The potential payoff is a meaningful reduction in fleet mileage and missed transshipments.

That said, the baseline model isn't a perfect fit. It strictly enforces administrative regional boundaries, even when a shortcut across a border would be shorter, and it ignores vehicle payload weight entirely, which limits its usefulness for sustainability goals like Vietnam's 2050 net-zero commitment.

## Where the Model Falls Short, and How We Extended It

The base 2R-MDPDP is a strong foundation, but working through these real-world applications exposed three gaps worth addressing.

1. **Emissions should depend on load, not just distance.** A fully loaded truck burns more fuel than an empty one, but the baseline objective treats every mile the same regardless of payload. We reformulated the objective function to calculate emissions based on the actual gross vehicle weight, tare weight plus current cargo, multiplied by distance and an emissions conversion factor. This required moving from a simple node-based load tracker to a full arc-flow formulation, and diversifying the vehicle fleet to include different capacities and tare weights.

2. **Rigid regional boundaries create unnecessary detours.** In the base model, a customer sitting five kilometers from a regional border might still need their package routed fifty kilometers backward to an origin depot before it can cross. We introduced cross-echelon flexibility: local vehicles can now perform a "direct delivery bypass" (origin fleet delivers straight to a customer in the neighboring region) or a "direct pickup bypass" (destination fleet collects directly from the neighboring region). Each inter-region request now chooses between the traditional linehaul path or one of these bypasses, whichever is most efficient.

3. **Driver shift limits need to be explicit.** Once regional boundaries become permeable, there's a real risk of local vehicles attempting excessively long cross-country detours to avoid depot transfers. We added a hard constraint capping total daily working time per vehicle, combining travel time and service time, to keep routes compliant with labor regulations even as the network becomes more flexible.

## What This Means for Logistics Planning

Stepping back, the lesson here is simple: good routing models need to reflect operational reality, not just geometric distance. The 2R-MDPDP already does a lot of that work by formally separating short-haul and long-haul operations and enforcing realistic multi-day synchronization. But sustainability, geographic pragmatism, and labor compliance are no longer optional add-ons, they're core requirements for any model that wants to be genuinely useful to a company like DB Schenker or Vietnam Post.

There's still more ground to cover, strategic questions like depot-opening decisions, revenue-sharing mechanisms between partner carriers, and more diverse fleet mixes are natural next steps. But the direction is clear: moving logistics optimization away from a narrow, distance-only cost function and toward a genuine triple-bottom-line approach that weighs environmental, social, and economic outcomes together.

## Conclusion

Working through the 2R-MDPDP, from its mathematical bones to its application in two very different real-world networks, was a reminder of how much complexity hides behind something as mundane as a parcel crossing a regional border. The model gives us a rigorous way to reason about that complexity, and the extensions we proposed (load-dependent emissions, cross-echelon bypass routing, and explicit driver time limits) push it a step closer to something a logistics planner could actually deploy.

If there's one takeaway, it's this: the best operations research doesn't just optimize the numbers on the page, it stays honest about the physical, environmental, and human constraints that shape how goods actually move through the world.