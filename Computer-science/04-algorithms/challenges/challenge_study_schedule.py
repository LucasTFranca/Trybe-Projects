def study_schedule(permanence_period, target_time):
    try:
        studants_counter = 0

        for start_time, stop_time in permanence_period:
            if start_time <= target_time and stop_time >= target_time:
                studants_counter += 1

        return studants_counter
    except TypeError:
        return None
